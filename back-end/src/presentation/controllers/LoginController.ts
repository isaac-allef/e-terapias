/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { MissingParamError } from '../erros/missingParamError';
import {
    badRequest,
    ok,
    serverError,
    unauthorized,
} from '../helpers/httpHelder';
import AuthenticationService from '../../core/services/AuthenticationService';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoginController implements Controller {
    constructor(private readonly authenticateService: AuthenticationService) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { email, password } = httpRequest.body;

            if (!email) {
                return badRequest(new MissingParamError('email'));
            }

            if (!password) {
                return badRequest(new MissingParamError('password'));
            }

            const userAuthenticated = await this.authenticateService.execute(
                email,
                password,
            );

            if (!userAuthenticated) {
                return unauthorized();
            }

            return ok({
                id: userAuthenticated.id,
                token: userAuthenticated.token,
            });
        } catch (err) {
            return serverError(err);
        }
    }
}
