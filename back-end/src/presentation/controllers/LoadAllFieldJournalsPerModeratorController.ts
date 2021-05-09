/* eslint-disable import/prefer-default-export */
import LoadAllFieldJournalsPerModeratorService from '../../core/services/LoadAllFieldJournalsPerModeratorService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadAllFieldJournalsPerModeratorController implements Controller {
    constructor(
        private readonly loadAllFieldJournalsPerModeratorService: LoadAllFieldJournalsPerModeratorService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { sort, direction, per_page, page } = httpRequest.query;
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new MissingParamError('moderatorId'));
            }

            const fieldJournal = await this.loadAllFieldJournalsPerModeratorService.execute(
                {
                    moderatorId: id,
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
