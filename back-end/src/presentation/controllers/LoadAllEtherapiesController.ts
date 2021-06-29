/* eslint-disable import/prefer-default-export */
import LoadAllEtherapiesService from '../../core/services/LoadAllEtherapiesService';
import { ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadAllEtherapiesController implements Controller {
    constructor(
        private readonly loadAllEtherapiesService: LoadAllEtherapiesService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const {
                offerId,
                sort,
                direction,
                per_page,
                page,
            } = httpRequest.query;

            const etherapy = await this.loadAllEtherapiesService.execute({
                offerId,
                sort,
                direction,
                per_page,
                page,
            });
            return ok(etherapy);
        } catch (err) {
            return serverError(err);
        }
    }
}
