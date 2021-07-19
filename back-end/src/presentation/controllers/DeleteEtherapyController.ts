/* eslint-disable import/prefer-default-export */
import DeleteEtherapyByIdService from '../../core/services/DeleteEtherapyByIdService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class DeleteEtherapyController implements Controller {
    constructor(
        private readonly deleteEtherapyByIdService: DeleteEtherapyByIdService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            const template = await this.deleteEtherapyByIdService.execute(id);

            return ok(template);
        } catch (err) {
            return serverError(err);
        }
    }
}
