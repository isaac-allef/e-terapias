/* eslint-disable import/prefer-default-export */
import LoadFieldJournalByIdService from '../../core/services/LoadFieldJournalByIdService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadFieldJournalPerMeModeratorController implements Controller {
    constructor(
        private readonly loadFieldJournalByIdService: LoadFieldJournalByIdService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;
            const moderatorId = httpRequest.userId;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            if (!moderatorId) {
                return badRequest(new MissingParamError('moderatorId'));
            }

            const FieldJournal = await this.loadFieldJournalByIdService.execute(
                id,
                moderatorId,
            );
            return ok(FieldJournal);
        } catch (err) {
            return serverError(err);
        }
    }
}
