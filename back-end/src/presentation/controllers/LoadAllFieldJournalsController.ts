/* eslint-disable import/prefer-default-export */
import LoadAllFieldJournalsService from '../../core/services/LoadAllFieldJournalsService';
import { ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadAllFieldJournalsController implements Controller {
    constructor(
        private readonly loadAllFieldJournalsService: LoadAllFieldJournalsService,
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

            const fieldJournal = await this.loadAllFieldJournalsService.execute(
                {
                    offerId,
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
