/* eslint-disable import/prefer-default-export */
import LoadUserByTokenService from '../../core/services/LoadUserByTokenService';
import { AccessDeniedError } from '../erros/AccessDeniedError';
import { forbidden, ok } from '../helpers/httpHelder';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Middelware } from '../protocols/middleware';

export class AuthMiddleware implements Middelware {
    constructor(
        private readonly loadUserByTokenService: LoadUserByTokenService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const accessToken = httpRequest.headers?.['x-access-token'];

            if (!accessToken) {
                throw new Error('Token no provided');
            }

            const user = await this.loadUserByTokenService.execute(accessToken);

            return ok({ userId: user.id });
        } catch {
            return forbidden(new AccessDeniedError());
        }
    }
}
