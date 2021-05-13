/* eslint-disable import/prefer-default-export */
import UploadManagersListService from '../../core/services/UploadManagersListService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class UploadManagersListController implements Controller {
    constructor(
        private readonly uploadManagersListService: UploadManagersListService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { basicInformations } = httpRequest.body;

            if (!basicInformations) {
                return badRequest(new MissingParamError('basicInformations'));
            }

            const Managers = await this.uploadManagersListService.execute(
                basicInformations,
            );
            return ok(Managers);
        } catch (err) {
            return serverError(err);
        }
    }
}
