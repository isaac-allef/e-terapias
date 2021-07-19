/* eslint-disable import/prefer-default-export */
import DeleteTemplateByIdService from '../../core/services/DeleteTemplateByIdService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class DeleteTemplateController implements Controller {
    constructor(
        private readonly deleteTemplateByIdService: DeleteTemplateByIdService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            const template = await this.deleteTemplateByIdService.execute(id);

            return ok(template);
        } catch (err) {
            return serverError(err);
        }
    }
}
