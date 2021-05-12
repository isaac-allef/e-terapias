import {
    forbidden,
    ok,
    serverError,
} from '../../../src/presentation/helpers/httpHelder';
import { AccessDeniedError } from '../../../src/presentation/erros/AccessDeniedError';
import { AuthMiddleware } from '../../../src/presentation/middlewares/authMiddleware';
import LoadUserByTokenService from '../../../src/core/services/LoadUserByTokenService';
import { TokenDecodederStub } from '../../core/mocks/mockToken';
import { LoadUserByTokenRepositoryStub } from '../../core/mocks/mockUser';
import { HttpRequest } from '../../../src/presentation/protocols/http';
import AppError from '../../../src/core/errors/AppError';

const makeLoadUserByTokenService = (): LoadUserByTokenService => {
    const tokenDecodederStub = new TokenDecodederStub();
    const loadUserByTokenRepositoryStub = new LoadUserByTokenRepositoryStub();
    return new LoadUserByTokenService(
        tokenDecodederStub,
        loadUserByTokenRepositoryStub,
    );
};

const makeFakeRequest = (): HttpRequest => ({
    headers: {
        authorization: 'Bearer any_token',
    },
});

interface SutTypes {
    sut: AuthMiddleware;
    loadUserByTokenServiceStub: LoadUserByTokenService;
}

const makeSut = (role?: string): SutTypes => {
    const loadUserByTokenServiceStub = makeLoadUserByTokenService();
    const sut = new AuthMiddleware(loadUserByTokenServiceStub, role);
    return {
        sut,
        loadUserByTokenServiceStub,
    };
};

describe('Auth Middleware', () => {
    test('Should return 403 if no authorization exists in headers', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle({});
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });

    test('Should call LoadUserByTokenService with correct accessToken', async () => {
        const role = 'any_role';
        const { sut, loadUserByTokenServiceStub } = makeSut(role);
        const executeSpy = jest.spyOn(loadUserByTokenServiceStub, 'execute');
        await sut.handle(makeFakeRequest());
        expect(executeSpy).toHaveBeenCalledWith('any_token', role);
    });

    test('Should return 500 if LoadUserByTokenService throws', async () => {
        const { sut, loadUserByTokenServiceStub } = makeSut();
        jest.spyOn(
            loadUserByTokenServiceStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error('random error');
        });
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(serverError(new Error('random error')));
    });

    test('Should return 403 if LoadUserByTokenService throws an AppError instance', async () => {
        const { sut, loadUserByTokenServiceStub } = makeSut();
        jest.spyOn(
            loadUserByTokenServiceStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new AppError('random error');
        });
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });

    test('Should return 200 if LoadUserByTokenService returns an user', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(
            ok({ userId: 'randomIdUser', userToken: 'any_token' }),
        );
    });
});
