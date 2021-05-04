/* eslint-disable import/prefer-default-export */
import LinkModeratorsToEtherapiesService from '../../core/services/LinkModeratorsToEtherapiesService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LinkModeratorsToEtherapiesController implements Controller {
    constructor(
        private readonly linkModeratorsToEtherapiesService: LinkModeratorsToEtherapiesService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { ids } = httpRequest.body;

            if (!ids) {
                return badRequest(new MissingParamError('ids'));
            }

            const etherapies = await this.linkModeratorsToEtherapiesService.execute(
                ids,
            );
            return ok(etherapies);
        } catch (err) {
            return serverError(err);
        }
    }
}
