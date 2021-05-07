import { forbidden, ok } from '../../../src/presentation/helpers/httpHelder';
import { AccessDeniedError } from '../../../src/presentation/erros/AccessDeniedError';
import { AuthMiddleware } from '../../../src/presentation/middlewares/authMiddleware';
import LoadUserByTokenService from '../../../src/core/services/LoadUserByTokenService';
import { TokenDecodederStub } from '../../core/mocks/mockToken';
import { LoadUserByTokenRepositoryStub } from '../../core/mocks/mockUser';
import { HttpRequest } from '../../../src/presentation/protocols/http';

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
        'x-access-token': 'any_token',
    },
});

interface SutTypes {
    sut: AuthMiddleware;
    loadUserByTokenServiceStub: LoadUserByTokenService;
}

const makeSut = (): SutTypes => {
    const loadUserByTokenServiceStub = makeLoadUserByTokenService();
    const sut = new AuthMiddleware(loadUserByTokenServiceStub);
    return {
        sut,
        loadUserByTokenServiceStub,
    };
};

describe('Auth Middleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle({});
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });

    test('Should call LoadUserByTokenService with correct accessToken', async () => {
        const { sut, loadUserByTokenServiceStub } = makeSut();
        const executeSpy = jest.spyOn(loadUserByTokenServiceStub, 'execute');
        await sut.handle(makeFakeRequest());
        expect(executeSpy).toHaveBeenCalledWith('any_token');
    });

    test('Should return 403 if LoadUserByTokenService throws', async () => {
        const { sut, loadUserByTokenServiceStub } = makeSut();
        jest.spyOn(
            loadUserByTokenServiceStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error('random error');
        });
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });

    test('Should return 200 if LoadUserByTokenService returns an user', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(ok({ userId: 'randomIdUser' }));
    });
});
