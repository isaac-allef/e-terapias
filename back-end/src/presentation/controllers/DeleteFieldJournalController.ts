/* eslint-disable import/prefer-default-export */
import DeleteFieldJournalByIdService from '../../core/services/DeleteFieldJournalByIdService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class DeleteFieldJournalController implements Controller {
    constructor(
        private readonly deleteFieldJournalByIdService: DeleteFieldJournalByIdService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            const template = await this.deleteFieldJournalByIdService.execute(
                id,
            );

            return ok(template);
        } catch (err) {
            return serverError(err);
        }
    }
}
