import bcrypt from 'bcryptjs';
import BcryptAdapter from '../../../src/infra/cryptography/bcryptAdapter';

jest.mock('bcryptjs', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hash'));
    },

    async compare(): Promise<boolean> {
        return new Promise(resolve => resolve(true));
    },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
    test('Should call generate with correct values', async () => {
        const sut = makeSut();
        const hashSpy = jest.spyOn(bcrypt, 'hash');
        await sut.generate('any_value');
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    test('Should return a valid hash on generate success', async () => {
        const sut = makeSut();
        const hash = await sut.generate('any_value');
        expect(hash).toBe('hash');
    });

    test('Should throw if bcrypt throws', async () => {
        const sut = makeSut();
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
            throw new Error();
        });
        const promise = sut.generate('any_value');
        await expect(promise).rejects.toThrow();
    });

    test('Should call compare with correct values', async () => {
        const sut = makeSut();
        const compareSpy = jest.spyOn(bcrypt, 'compare');
        await sut.compare('any_value', 'any_hash');
        expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
    });

    test('Should return true when compare succeeds', async () => {
        const sut = makeSut();
        const isvalid = await sut.compare('any_value', 'any_hash');
        expect(isvalid).toBe(true);
    });

    test('Should return false when compare fails', async () => {
        const sut = makeSut();
        jest.spyOn(bcrypt, 'compare').mockImplementationOnce(
            () => new Promise(resolve => resolve(false)),
        );
        const isvalid = await sut.compare('any_value', 'any_hash');
        expect(isvalid).toBe(false);
    });
});
