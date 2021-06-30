/* eslint-disable import/prefer-default-export */
import LoadAllFieldJournalsPerEtherapyService from '../../core/services/LoadAllFieldJournalsPerEtherapyService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadAllFieldJournalsPerEtherapyController implements Controller {
    constructor(
        private readonly loadAllFieldJournalsPerEtherapyService: LoadAllFieldJournalsPerEtherapyService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const {
                offerId,
                sort,
                direction,
                per_page,
                page,
            } = httpRequest.query;
            const { id } = httpRequest.params;

            if (!id) {
                return badRequest(new MissingParamError('EtherapyId'));
            }

            const fieldJournal = await this.loadAllFieldJournalsPerEtherapyService.execute(
                {
                    offerId,
                    etherapyId: id,
                    sort,
                    direction,
                    per_page,
                    page,
                },
            );
            return ok(fieldJournal);
        } catch (err) {
            return serverError(err);
        }
    }
}
