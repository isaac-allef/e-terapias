/* eslint-disable import/prefer-default-export */
import LoadEtherapyByIdService from '../../core/services/LoadEtherapyByIdService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadEtherapyController implements Controller {
    constructor(
        private readonly loadEtherapyByIdService: LoadEtherapyByIdService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            const etherapy = await this.loadEtherapyByIdService.execute(id);
            return ok(etherapy);
        } catch (err) {
            return serverError(err);
        }
    }
}
