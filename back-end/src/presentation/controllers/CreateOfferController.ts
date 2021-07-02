/* eslint-disable import/prefer-default-export */
import CreateOfferService from '../../core/services/CreateOfferService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class CreateOfferController implements Controller {
    constructor(private readonly createOfferService: CreateOfferService) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, dateStart, dateEnd, settings } = httpRequest.body;

            if (!name) {
                return badRequest(new MissingParamError('name'));
            }

            if (!dateStart) {
                return badRequest(new MissingParamError('dateStart'));
            }

            if (!dateEnd) {
                return badRequest(new MissingParamError('dateEnd'));
            }

            if (!settings) {
                return badRequest(new MissingParamError('settings'));
            }

            const offer = await this.createOfferService.execute({
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
