import bcrypt from 'bcryptjs';
import BcryptAdapter from '../../../src/infra/cryptography/bcryptAdapter';

describe('Bcrypt Adapter', () => {
    test('Should call bcrypt with correct values', async () => {
        const salt = 12;
        const sut = new BcryptAdapter(salt);
        const hashSpy = jest.spyOn(bcrypt, 'hash');
        await sut.generate('any_value');
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });
});
