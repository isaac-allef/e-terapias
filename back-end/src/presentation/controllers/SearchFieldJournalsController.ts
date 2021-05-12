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
            const { keyword } = httpRequest.params;

            if (!keyword) {
                return badRequest(new MissingParamError('keyword'));
            }

            const fieldJournals = await this.searchFieldJournalsService.execute(
                keyword,
            );
            return ok(fieldJournals);
        } catch (err) {
            return serverError(err);
        }
    }
}
