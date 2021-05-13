/* eslint-disable import/prefer-default-export */
import { MissingParamError } from '../../presentation/erros/missingParamError';
import {
    badRequest,
    unauthorized,
} from '../../presentation/helpers/httpHelder';
import { Controller } from '../../presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http';

export class SecretControllerDecorator implements Controller {
    constructor(private controller: Controller) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { secret } = httpRequest.body;

        if (!secret) {
            return badRequest(new MissingParamError('secret'));
        }

        if (secret !== 'batata') {
            return unauthorized();
        }

        const httpResponse = await this.controller.handle(httpRequest);

        return httpResponse;
    }
}
