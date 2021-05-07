import { TokenDecodederStub } from '../mocks/mockToken';
import LoadUserByTokenService from '../../../src/core/services/LoadUserByTokenService';
import TokenDecodeder from '../../../src/core/protocols/Token/TokenDecodeder';
import LoadUserByTokenRepository from '../../../src/core/protocols/db/repositories/LoadUserByTokenRepository';
import { LoadUserByTokenRepositoryStub } from '../mocks/mockUser';

interface SutTypes {
    sut: LoadUserByTokenService;
    tokenDecodederStub: TokenDecodeder;
    loadUserByTokenRepositoryStub: LoadUserByTokenRepository;
}

const makeSut = (): SutTypes => {
    const tokenDecodederStub = new TokenDecodederStub();
    const loadUserByTokenRepositoryStub = new LoadUserByTokenRepositoryStub();
    const sut = new LoadUserByTokenService(
        tokenDecodederStub,
        loadUserByTokenRepositoryStub,
    );

    return {
        sut,
        tokenDecodederStub,
        loadUserByTokenRepositoryStub,
    };
};

describe('LoadUserByIdToken usecase', () => {
    test('Should call TokenDecodeder with correct values', async () => {
        const { sut, tokenDecodederStub } = makeSut();
        const decodeSpy = jest.spyOn(tokenDecodederStub, 'decode');
        await sut.execute('any_token');
        expect(decodeSpy).toHaveBeenCalledWith('any_token');
    });

    test('Should throw if TokenDecodeder throws', async () => {
        const { sut, tokenDecodederStub } = makeSut();
        jest.spyOn(tokenDecodederStub, 'decode').mockImplementationOnce(() => {
            throw new Error('Random error');
        });
        await expect(sut.execute('any_token', 'any_role')).rejects.toThrow();
    });

    test('Should call LoadUserByTokenRepository with correct values', async () => {
        const { sut, loadUserByTokenRepositoryStub } = makeSut();
        const loadByTokenSpy = jest.spyOn(
            loadUserByTokenRepositoryStub,
            'loadByToken',
        );
        await sut.execute('any_token', 'any_role');
        expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role');
    });
});
