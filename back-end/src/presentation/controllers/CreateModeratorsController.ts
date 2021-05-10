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
            const { basicInformations, links } = httpRequest.body;

            if (!basicInformations) {
                return badRequest(new MissingParamError('basicInformations'));
            }

            if (!links) {
                return badRequest(new MissingParamError('links'));
            }

            const moderators = await this.createModeratorsService.execute({
                data: basicInformations,
                links,
            });
            return ok(moderators);
        } catch (err) {
            return serverError(err);
        }
    }
}
