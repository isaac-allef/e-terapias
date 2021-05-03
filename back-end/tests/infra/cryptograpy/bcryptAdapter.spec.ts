import bcrypt from 'bcryptjs';
import BcryptAdapter from '../../../src/infra/cryptography/bcryptAdapter';

jest.mock('bcryptjs', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hash'));
    },
}));

describe('Bcrypt Adapter', () => {
    test('Should call bcrypt with correct values', async () => {
        const salt = 12;
        const sut = new BcryptAdapter(salt);
        const hashSpy = jest.spyOn(bcrypt, 'hash');
        await sut.generate('any_value');
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    test('Should return a hash on success', async () => {
        const salt = 12;
        const sut = new BcryptAdapter(salt);
        const hash = await sut.generate('any_value');
        expect(hash).toBe('hash');
    });
});
