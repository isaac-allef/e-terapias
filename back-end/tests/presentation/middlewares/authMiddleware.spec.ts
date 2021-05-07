import { forbidden } from '../../../src/presentation/helpers/httpHelder';
import { AccessDeniedError } from '../../../src/presentation/erros/AccessDeniedError';
import { AuthMiddleware } from '../../../src/presentation/middlewares/authMiddleware';
import LoadUserByTokenService from '../../../src/core/services/LoadUserByTokenService';
import { TokenDecodederStub } from '../../core/mocks/mockToken';
import { LoadUserByTokenRepositoryStub } from '../../core/mocks/mockUser';

const makeLoadUserByTokenService = (): LoadUserByTokenService => {
    const tokenDecodederStub = new TokenDecodederStub();
    const loadUserByTokenRepositoryStub = new LoadUserByTokenRepositoryStub();
    return new LoadUserByTokenService(
        tokenDecodederStub,
        loadUserByTokenRepositoryStub,
    );
};

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

    test('Should call LoadUserByToken with correct accessToken', async () => {
        const { sut, loadUserByTokenServiceStub } = makeSut();
        const executeSpy = jest.spyOn(loadUserByTokenServiceStub, 'execute');
        await sut.handle({
            headers: {
                'x-access-token': 'any_token',
            },
        });
        expect(executeSpy).toHaveBeenCalledWith('any_token');
    });
});
