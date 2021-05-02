import { LoginController } from '../../../src/presentation/controllers/LoginController';
import { MissingParamError } from '../../../src/presentation/erros/missingParamError';
import { HttpRequest } from '../../../src/presentation/protocols/http';
import AuthenticationService from '../../../src/core/services/AuthenticationService';
import {
    LoadUserByEmailRepositoryStub,
    UpdateAccessTokenRepositoryStub,
} from '../../core/mocks/mockUser';
import { HashCompareStub } from '../../core/mocks/mockCryptography';
import { TokenGeneraterStub } from '../../core/mocks/mockToken';
import {
    ok,
    serverError,
    unauthorized,
} from '../../../src/presentation/helpers/httpHelder';

const makeFakeRequest = (): HttpRequest => ({
    body: {
        email: 'any_email@email.com',
        password: 'any_password',
    },
});

const makeAuthenticationService = (): AuthenticationService => {
    const loadUserByEmailRepository = new LoadUserByEmailRepositoryStub();
    const hashComparer = new HashCompareStub();
    const tokenGenerater = new TokenGeneraterStub();
    const updateAccessTokenRepository = new UpdateAccessTokenRepositoryStub();
    return new AuthenticationService(
        loadUserByEmailRepository,
        hashComparer,
        tokenGenerater,
        updateAccessTokenRepository,
    );
};

interface SutTypes {
    sut: LoginController;
    authenticationServiceStub: AuthenticationService;
}

const makeSut = (): SutTypes => {
    const authenticationServiceStub = makeAuthenticationService();
    const sut = new LoginController(authenticationServiceStub);
    return {
        sut,
        authenticationServiceStub,
    };
};

describe('Login controller', () => {
    test('Should return 400 if no email is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                password: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'));
    });

    test('Should return 400 if no password is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                email: 'any_email',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password'));
    });

    test('Should call Authentication with corret values', async () => {
        const { sut, authenticationServiceStub } = makeSut();
        const authSpy = jest.spyOn(authenticationServiceStub, 'execute');
        await sut.handle(makeFakeRequest());
        expect(authSpy).toHaveBeenCalledWith(
            'any_email@email.com',
            'any_password',
        );
    });

    test('Should return 500 if AuthenticationService throws', async () => {
        const { sut, authenticationServiceStub } = makeSut();
        jest.spyOn(authenticationServiceStub, 'execute').mockImplementationOnce(
            () => {
                throw new Error('any error');
            },
        );
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticationServiceStub } = makeSut();
        jest.spyOn(authenticationServiceStub, 'execute').mockReturnValueOnce(
            new Promise(resolve => resolve(null)),
        );
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(unauthorized());
    });

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(
            ok({ id: 'randomIdUser', token: 'randomToken' }),
        );
    });
});
