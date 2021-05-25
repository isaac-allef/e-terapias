/* eslint-disable import/prefer-default-export */
import SearchEtherapiesService from '../../core/services/SearchEtherapiesService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SearchEtherapiesController implements Controller {
    constructor(
        private readonly searchEtherapiesService: SearchEtherapiesService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { keywords } = httpRequest.params;
            const { per_page, page } = httpRequest.query;

            if (!keywords) {
                return badRequest(new MissingParamError('keywords'));
            }

            const etherapy = await this.searchEtherapiesService.execute({
                keywords,
                per_page,
                page,
            });
            return ok(etherapy);
        } catch (err) {
            return serverError(err);
        }
    }
}
