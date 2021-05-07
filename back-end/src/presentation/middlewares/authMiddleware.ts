/* eslint-disable import/prefer-default-export */
import AppError from '../../core/errors/AppError';
import LoadUserByTokenService from '../../core/services/LoadUserByTokenService';
import { AccessDeniedError } from '../erros/AccessDeniedError';
import { forbidden, ok, serverError } from '../helpers/httpHelder';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Middleware } from '../protocols/middleware';

export class AuthMiddleware implements Middleware {
    constructor(
        private readonly loadUserByTokenService: LoadUserByTokenService,
        private readonly role?: string,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const accessToken = httpRequest.headers?.['x-access-token'];

            if (!accessToken) {
                return forbidden(new AccessDeniedError());
            }

            const user = await this.loadUserByTokenService.execute(
                accessToken,
                this.role,
            );

            return ok({ userId: user.id });
        } catch (err) {
            if (err instanceof AppError) {
                return forbidden(new AccessDeniedError());
            }
            return serverError(err);
        }
    }
}
