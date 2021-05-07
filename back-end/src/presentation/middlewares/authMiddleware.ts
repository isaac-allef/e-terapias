/* eslint-disable import/prefer-default-export */
import LoadUserByTokenService from '../../core/services/LoadUserByTokenService';
import { AccessDeniedError } from '../erros/AccessDeniedError';
import { forbidden } from '../helpers/httpHelder';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Middelware } from '../protocols/middleware';

export class AuthMiddleware implements Middelware {
    constructor(
        private readonly loadUserByTokenService: LoadUserByTokenService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const accessToken = httpRequest.headers?.['x-access-token'];
        if (accessToken) {
            await this.loadUserByTokenService.execute(accessToken);
        }
        const error = forbidden(new AccessDeniedError());
        return new Promise(resolve => resolve(error));
    }
}
