/* eslint-disable import/prefer-default-export */
import LoadAllTemplatesService from '../../core/services/LoadAllTemplatesService';
import { ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadAllTemplatesController implements Controller {
    constructor(
        private readonly loadAllTemplatesService: LoadAllTemplatesService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { sort, direction, per_page, page } = httpRequest.query;

            const templates = await this.loadAllTemplatesService.execute({
                sort,
                direction,
                per_page,
                page,
            });
            return ok(templates);
        } catch (err) {
            return serverError(err);
        }
    }
}
