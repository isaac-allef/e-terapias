import AuthenticationService from '../../../src/core/services/AuthenticationService';
import {
    LoadUserByEmailRepositoryStub,
    UpdateAccessTokenRepositoryStub,
} from '../mocks/mockUser';
import { HashCompareStub } from '../mocks/mockCryptography';
import { TokenGeneraterStub } from '../mocks/mockToken';
import LoadUserByEmailRepository from '../../../src/core/protocols/db/repositories/LoadUserByEmailRepository';
import HashComparer from '../../../src/core/protocols/cryptography/HashComparer';
import TokenGenerater from '../../../src/core/protocols/Token/TokenGenerater';
import UpdateAccessTokenRepository from '../../../src/core/protocols/db/repositories/UpdateAccessTokenRepository';

interface SutTypes {
    sut: AuthenticationService;
    loadUserByEmailRepository: LoadUserByEmailRepository;
    hashComparer: HashComparer;
    tokenGenerater: TokenGenerater;
    updateAccessTokenRepository: UpdateAccessTokenRepository;
}

const makeSut = (): SutTypes => {
    const loadUserByEmailRepository = new LoadUserByEmailRepositoryStub();
    const hashComparer = new HashCompareStub();
    const tokenGenerater = new TokenGeneraterStub();
    const updateAccessTokenRepository = new UpdateAccessTokenRepositoryStub();
    const sut = new AuthenticationService(
        loadUserByEmailRepository,
        hashComparer,
        tokenGenerater,
        updateAccessTokenRepository,
    );
    return {
        sut,
        loadUserByEmailRepository,
        hashComparer,
        tokenGenerater,
        updateAccessTokenRepository,
    };
};

describe('Authentication usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute('any_email@email.com', 'any_password');
        expect(executeSpy).toHaveBeenCalledWith(
            'any_email@email.com',
            'any_password',
        );
    });

    test('Should call LoadUserByEmailRepository with correct values', async () => {
        const { sut, loadUserByEmailRepository } = makeSut();
        const loadSpy = jest.spyOn(loadUserByEmailRepository, 'loadByEmail');
        await sut.execute('any_email@email.com', 'any_password');
        expect(loadSpy).toHaveBeenCalledWith('any_email@email.com');
    });

    test('Should throw if LoadUserByEmailRepository throws', async () => {
        const { sut, loadUserByEmailRepository } = makeSut();
        jest.spyOn(
            loadUserByEmailRepository,
            'loadByEmail',
        ).mockImplementationOnce(() => {
            throw new Error('Random error');
        });
        await expect(
            sut.execute('any_email@email.com', 'any_password'),
        ).rejects.toThrow();
    });

    test('Should call HashComparer with correct values', async () => {
        const { sut, hashComparer, loadUserByEmailRepository } = makeSut();
        jest.spyOn(
            loadUserByEmailRepository,
            'loadByEmail',
        ).mockReturnValueOnce(
            new Promise(resolve =>
                resolve({
                    id: 'randomIdUser',
                    email: 'any_email@email.com',
                    password: 'any_password',
                    token: 'randomToken',
                    role: '',
                }),
            ),
        );
        const compareSpy = jest.spyOn(hashComparer, 'compare');
        await sut.execute('any_email@email.com', 'any_password');
        expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password');
    });

    test('Should throw if HashComparer throws', async () => {
        const { sut, hashComparer } = makeSut();
        jest.spyOn(hashComparer, 'compare').mockImplementationOnce(() => {
            throw new Error('Random error');
        });

        await expect(
            sut.execute('any_email@email.com', 'any_password'),
        ).rejects.toThrow();
    });
});
