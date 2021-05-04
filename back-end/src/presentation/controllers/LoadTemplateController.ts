/* eslint-disable import/prefer-default-export */
import LoadTemplateByIdService from '../../core/services/LoadTemplateByIdService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadTemplateController implements Controller {
    constructor(
        private readonly loadTemplateByIdService: LoadTemplateByIdService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            const template = await this.loadTemplateByIdService.execute(id);
            return ok(template);
        } catch (err) {
            return serverError(err);
        }
    }
}
