/* eslint-disable import/prefer-default-export */
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class TestController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;
            const { name } = httpRequest.query;
            const { text } = httpRequest.body;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            if (!name) {
                return badRequest(new MissingParamError('name'));
            }

            if (!text) {
                return badRequest(new MissingParamError('text'));
            }

            return ok({
                id,
                message: `Hello ${name}`,
                text,
            });
        } catch (err) {
            return serverError(err);
        }
    }
}
