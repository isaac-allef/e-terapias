/* eslint-disable import/prefer-default-export */
import LoadOfferByIdService from '../../core/services/LoadOfferByIdService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadOfferController implements Controller {
    constructor(private readonly loadOfferByIdService: LoadOfferByIdService) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            const offer = await this.loadOfferByIdService.execute(id);
            return ok(offer);
        } catch (err) {
            return serverError(err);
        }
    }
}
