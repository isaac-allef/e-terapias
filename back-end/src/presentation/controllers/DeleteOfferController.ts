/* eslint-disable import/prefer-default-export */
import DeleteOfferByIdService from '../../core/services/DeleteOfferByIdService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class DeleteOfferController implements Controller {
    constructor(
        private readonly deleteOfferByIdService: DeleteOfferByIdService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            const template = await this.deleteOfferByIdService.execute(id);

            return ok(template);
        } catch (err) {
            return serverError(err);
        }
    }
}
