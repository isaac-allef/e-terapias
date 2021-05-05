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
            const { keyword } = httpRequest.params;

            if (!keyword) {
                return badRequest(new MissingParamError('keyword'));
            }

            const etherapy = await this.searchEtherapiesService.execute(
                keyword,
            );
            return ok(etherapy);
        } catch (err) {
            return serverError(err);
        }
    }
}
