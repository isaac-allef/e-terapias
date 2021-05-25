/* eslint-disable import/prefer-default-export */
import SearchFieldJournalsService from '../../core/services/SearchFieldJournalsService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SearchFieldJournalsController implements Controller {
    constructor(
        private readonly searchFieldJournalsService: SearchFieldJournalsService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { keywords } = httpRequest.params;
            const { per_page, page } = httpRequest.query;

            if (!keywords) {
                return badRequest(new MissingParamError('keywords'));
            }

            const fieldJournals = await this.searchFieldJournalsService.execute(
                { keywords, per_page, page },
            );
            return ok(fieldJournals);
        } catch (err) {
            return serverError(err);
        }
    }
}
