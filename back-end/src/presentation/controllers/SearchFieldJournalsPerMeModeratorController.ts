/* eslint-disable import/prefer-default-export */
import SearchFieldJournalsPerModeratorService from '../../core/services/SearchFieldJournalsPerModeratorService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SearchFieldJournalsPerMeModeratorController implements Controller {
    constructor(
        private readonly searchFieldJournalsPerModeratorService: SearchFieldJournalsPerModeratorService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { keywords } = httpRequest.params;
            const { per_page, page } = httpRequest.query;
            const moderatorId = httpRequest.userId;

            if (!moderatorId) {
                return badRequest(new MissingParamError('moderatorId'));
            }

            if (!keywords) {
                return badRequest(new MissingParamError('keywords'));
            }

            const fieldJournal = await this.searchFieldJournalsPerModeratorService.execute(
                { moderatorId, keywords, per_page, page },
            );
            return ok(fieldJournal);
        } catch (err) {
            return serverError(err);
        }
    }
}
