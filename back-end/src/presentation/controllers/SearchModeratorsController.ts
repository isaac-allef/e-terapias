/* eslint-disable import/prefer-default-export */
import SearchModeratorsService from '../../core/services/SearchModeratorsService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SearchModeratorsController implements Controller {
    constructor(
        private readonly searchModeratorsService: SearchModeratorsService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { keywords } = httpRequest.params;
            const { per_page, page } = httpRequest.query;

            if (!keywords) {
                return badRequest(new MissingParamError('keywords'));
            }

            const moderators = await this.searchModeratorsService.execute({
                keywords,
                per_page,
                page,
            });
            return ok(moderators);
        } catch (err) {
            return serverError(err);
        }
    }
}
