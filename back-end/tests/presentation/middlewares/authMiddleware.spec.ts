import { forbidden } from '../../../src/presentation/helpers/httpHelder';
import { AccessDeniedError } from '../../../src/presentation/erros/AccessDeniedError';
import { AuthMiddleware } from '../../../src/presentation/middlewares/authMiddleware';

describe('Auth Middleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {
        const sut = new AuthMiddleware();
        const httpResponse = await sut.handle({});
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });
});
