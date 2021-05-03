import jwt from 'jsonwebtoken';
import JwtAdapter from '../../../src/infra/token/jwtAdapter';

jest.mock('jsonwebtoken', () => ({
    async sign(): Promise<string> {
        return new Promise(resolve => resolve('any_token'));
    },
}));

describe('Jwt Adapter', () => {
    test('Should call sign with correct values', async () => {
        const sut = new JwtAdapter('secret');
        const signSpy = jest.spyOn(jwt, 'sign');
        await sut.generate('any_id');
        expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });

    test('Should return a token on sign success', async () => {
        const sut = new JwtAdapter('secret');
        const accessToken = await sut.generate('any_id');
        expect(accessToken).toBe('any_token');
    });
});
