/* eslint-disable import/prefer-default-export */
import UploadModeratorsListService from '../../core/services/UploadModeratorsListService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class UploadModeratorsListController implements Controller {
    constructor(
        private readonly uploadModeratorsListService: UploadModeratorsListService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { basicInformations } = httpRequest.body;

            if (!basicInformations) {
                return badRequest(new MissingParamError('basicInformations'));
            }

            const moderators = await this.uploadModeratorsListService.execute(
                basicInformations,
            );
            return ok(moderators);
        } catch (err) {
            return serverError(err);
        }
    }
}
