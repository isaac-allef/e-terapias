/* eslint-disable import/prefer-default-export */
import UploadEtherapiesListService from '../../core/services/UploadEtherapiesListService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class UploadEtherapiesListController implements Controller {
    constructor(
        private readonly uploadEtherapiesListService: UploadEtherapiesListService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { offerId, basicInformations } = httpRequest.body;

            if (!offerId) {
                return badRequest(new MissingParamError('offerId'));
            }

            if (!basicInformations) {
                return badRequest(new MissingParamError('basicInformations'));
            }

            const etherapies = await this.uploadEtherapiesListService.execute({
                offerId,
                etherapiesData: basicInformations,
            });
            return ok(etherapies);
        } catch (err) {
            return serverError(err);
        }
    }
}
