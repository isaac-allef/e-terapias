/* eslint-disable import/prefer-default-export */
import LoadAllModeratorsService from '../../core/services/LoadAllModeratorsService';
import { ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadAllModeratorsController implements Controller {
    constructor(
        private readonly loadAllModeratorsService: LoadAllModeratorsService,
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

            const moderator = await this.loadAllModeratorsService.execute({
                offerId,
                sort,
                direction,
                per_page,
                page,
            });
            return ok(moderator);
        } catch (err) {
            return serverError(err);
        }
    }
}
