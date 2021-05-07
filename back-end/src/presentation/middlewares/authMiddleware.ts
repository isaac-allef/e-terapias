/* eslint-disable import/prefer-default-export */
import { AccessDeniedError } from '../erros/AccessDeniedError';
import { forbidden } from '../helpers/httpHelder';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Middelware } from '../protocols/middleware';

export class AuthMiddleware implements Middelware {
    async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = forbidden(new AccessDeniedError());
        return new Promise(resolve => resolve(error));
    }
}
