/* eslint-disable import/prefer-default-export */
import LoadAllFieldJournalsPerModeratorService from '../../core/services/LoadAllFieldJournalsPerModeratorService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadAllFieldJournalsPerMeModeratorController
    implements Controller {
    constructor(
        private readonly loadAllFieldJournalsPerModeratorService: LoadAllFieldJournalsPerModeratorService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const {
                offerId,
                sort,
                direction,
                per_page,
                page,
            } = httpRequest.query;
            const moderatorId = httpRequest.userId;

            if (!moderatorId) {
                return badRequest(new MissingParamError('moderatorId'));
            }

            const fieldJournal = await this.loadAllFieldJournalsPerModeratorService.execute(
                {
                    offerId,
                    moderatorId,
                    sort,
                    direction,
                    per_page,
                    page,
                },
            );
            return ok(fieldJournal);
        } catch (err) {
            return serverError(err);
        }
    }
}
