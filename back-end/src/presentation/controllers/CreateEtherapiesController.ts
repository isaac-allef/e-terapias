/* eslint-disable import/prefer-default-export */
import CreateEtherapiesService from '../../core/services/CreateEtherapiesService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class CreateEtherapiesController implements Controller {
    constructor(
        private readonly createEtherapiesService: CreateEtherapiesService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { names } = httpRequest.body;

            if (!names) {
                return badRequest(new MissingParamError('names'));
            }

            const etherapies = await this.createEtherapiesService.execute(
                names,
            );
            return ok(etherapies);
        } catch (err) {
            return serverError(err);
        }
    }
}
