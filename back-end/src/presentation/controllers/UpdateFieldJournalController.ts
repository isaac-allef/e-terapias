/* eslint-disable import/prefer-default-export */
import UpdateFieldJournalService from '../../core/services/UpdateFieldJournalService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class UpdateFieldJournalController implements Controller {
    constructor(
        private readonly updateFieldJournalService: UpdateFieldJournalService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, date, fields } = httpRequest.body;
            const { id } = httpRequest.params;
            const moderatorId = httpRequest.userId;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            if (!name) {
                return badRequest(new MissingParamError('name'));
            }

            if (!date) {
                return badRequest(new MissingParamError('date'));
            }

            if (!fields) {
                return badRequest(new MissingParamError('fields'));
            }

            if (!moderatorId) {
                return badRequest(new MissingParamError('moderatorId'));
            }

            const fieldJournal = await this.updateFieldJournalService.execute({
                id,
                name,
                date,
                fields,
                moderatorId,
            });
            return ok(fieldJournal);
        } catch (err) {
            return serverError(err);
        }
    }
}
