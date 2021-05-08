/* eslint-disable import/prefer-default-export */
import LoadModeratorByIdService from '../../core/services/LoadModeratorByIdService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadMeModeratorController implements Controller {
    constructor(
        private readonly loadModeratorByIdService: LoadModeratorByIdService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const id = httpRequest.userId;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            const moderator = await this.loadModeratorByIdService.execute(id);
            return ok(moderator);
        } catch (err) {
            return serverError(err);
        }
    }
}
