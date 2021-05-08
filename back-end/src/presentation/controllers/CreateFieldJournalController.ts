/* eslint-disable import/prefer-default-export */
import CreateFieldJournalService from '../../core/services/CreateFieldJournalService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class CreateFieldJournalController implements Controller {
    constructor(
        private readonly createFieldJournalService: CreateFieldJournalService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, fields, etherapyId } = httpRequest.body;
            const moderatorId = httpRequest.userId;

            if (!name) {
                return badRequest(new MissingParamError('name'));
            }

            if (!fields) {
                return badRequest(new MissingParamError('fields'));
            }

            if (!moderatorId) {
                return badRequest(new MissingParamError('moderatorId'));
            }

            if (!etherapyId) {
                return badRequest(new MissingParamError('etherapyId'));
            }

            const FieldJournal = await this.createFieldJournalService.execute({
                name,
                fields,
                moderatorId,
                etherapyId,
            });
            return ok(FieldJournal);
        } catch (err) {
            return serverError(err);
        }
    }
}
