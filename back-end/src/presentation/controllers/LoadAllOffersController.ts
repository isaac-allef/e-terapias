/* eslint-disable import/prefer-default-export */
import LoadAllOffersService from '../../core/services/LoadAllOffersService';
import { ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadAllOffersController implements Controller {
    constructor(private readonly loadAllOffersService: LoadAllOffersService) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { sort, direction, per_page, page } = httpRequest.query;

            const offer = await this.loadAllOffersService.execute({
                sort,
                direction,
                per_page,
                page,
            });
            return ok(offer);
        } catch (err) {
            return serverError(err);
        }
    }
}
