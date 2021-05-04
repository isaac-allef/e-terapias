/* eslint-disable import/prefer-default-export */
import CreateTemplateService from '../../core/services/CreateTemplateService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class CreateTemplateController implements Controller {
    constructor(
        private readonly createTemplateService: CreateTemplateService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { description } = httpRequest.body;

            if (!description) {
                return badRequest(new MissingParamError('description'));
            }

            const template = await this.createTemplateService.execute(
                description,
            );
            return ok(template);
        } catch (err) {
            return serverError(err);
        }
    }
}
