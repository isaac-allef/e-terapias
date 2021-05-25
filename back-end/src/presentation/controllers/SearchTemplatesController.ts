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
            const { keywords } = httpRequest.params;
            const { per_page, page } = httpRequest.query;

            if (!keywords) {
                return badRequest(new MissingParamError('keywords'));
            }

            const templates = await this.searchTemplatesService.execute({
                keywords,
                per_page,
                page,
            });
            return ok(templates);
        } catch (err) {
            return serverError(err);
        }
    }
}
