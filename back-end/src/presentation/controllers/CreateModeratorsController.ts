/* eslint-disable import/prefer-default-export */
import CreateModeratorsService from '../../core/services/CreateModeratorsService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class CreateModeratorsController implements Controller {
    constructor(
        private readonly createModeratorsService: CreateModeratorsService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { basicInformations } = httpRequest.body;

            if (!basicInformations) {
                return badRequest(new MissingParamError('basicInformations'));
            }

            const moderators = await this.createModeratorsService.execute(
                basicInformations,
            );
            return ok(moderators);
        } catch (err) {
            return serverError(err);
        }
    }
}
