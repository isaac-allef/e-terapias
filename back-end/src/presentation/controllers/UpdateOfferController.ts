/* eslint-disable import/prefer-default-export */
import UpdateOfferService from '../../core/services/UpdateOfferService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class UpdateOfferController implements Controller {
    constructor(private readonly updateOfferService: UpdateOfferService) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;
            const { name, dateStart, dateEnd, settings } = httpRequest.body;
            // const managerId = httpRequest.userId;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            // if (!managerId) {
            //     return badRequest(new MissingParamError('managerId'));
            // }

            const offer = await this.updateOfferService.execute({
                id,
                name,
                dateStart,
                dateEnd,
                settings,
            });
            return ok(offer);
        } catch (err) {
            return serverError(err);
        }
    }
}
