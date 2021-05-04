/* eslint-disable import/prefer-default-export */
import LinkTemplateToEtherapiesService from '../../core/services/LinkTemplateToEtherapiesService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LinkTemplateToEtherapiesController implements Controller {
    constructor(
        private readonly linkTemplateToEtherapiesService: LinkTemplateToEtherapiesService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { templateId, etherapiesIds } = httpRequest.body;

            if (!templateId) {
                return badRequest(new MissingParamError('templateId'));
            }

            if (!etherapiesIds) {
                return badRequest(new MissingParamError('etherapiesIds'));
            }

            const isLinked = await this.linkTemplateToEtherapiesService.execute(
                templateId,
                etherapiesIds,
            );

            return ok(isLinked);
        } catch (err) {
            return serverError(err);
        }
    }
}
