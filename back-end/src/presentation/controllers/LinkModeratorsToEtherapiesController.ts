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
            const { links } = httpRequest.body;

            if (!links) {
                return badRequest(new MissingParamError('ids'));
            }

            const isLinked = await this.linkModeratorsToEtherapiesService.execute(
                links,
            );
            return ok(isLinked);
        } catch (err) {
            return serverError(err);
        }
    }
}
