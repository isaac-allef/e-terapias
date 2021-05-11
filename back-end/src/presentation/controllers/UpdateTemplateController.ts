/* eslint-disable import/prefer-default-export */
import UpdateTemplateService from '../../core/services/UpdateTemplateService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class UpdateTemplateController implements Controller {
    constructor(
        private readonly updateTemplateService: UpdateTemplateService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;
            const { description } = httpRequest.body;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            if (!description) {
                return badRequest(new MissingParamError('description'));
            }

            const template = await this.updateTemplateService.execute({
                id,
                description,
            });
            return ok(template);
        } catch (err) {
            return serverError(err);
        }
    }
}
