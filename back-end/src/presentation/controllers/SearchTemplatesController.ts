/* eslint-disable import/prefer-default-export */
import SearchTemplatesService from '../../core/services/SearchTemplatesService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SearchTemplatesController implements Controller {
    constructor(
        private readonly searchTemplatesService: SearchTemplatesService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { keyword } = httpRequest.params;

            if (!keyword) {
                return badRequest(new MissingParamError('keyword'));
            }

            const templates = await this.searchTemplatesService.execute(
                keyword,
            );
            return ok(templates);
        } catch (err) {
            return serverError(err);
        }
    }
}
