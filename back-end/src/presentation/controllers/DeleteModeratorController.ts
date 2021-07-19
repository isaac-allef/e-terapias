/* eslint-disable import/prefer-default-export */
import DeleteModeratorByIdService from '../../core/services/DeleteModeratorByIdService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class DeleteModeratorController implements Controller {
    constructor(
        private readonly deleteModeratorByIdService: DeleteModeratorByIdService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            const template = await this.deleteModeratorByIdService.execute(id);

            return ok(template);
        } catch (err) {
            return serverError(err);
        }
    }
}
