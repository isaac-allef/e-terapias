/* eslint-disable import/prefer-default-export */
import LoadMetricsService from '../../core/services/LoadMetricsService';
import { ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class LoadMetricsController implements Controller {
    constructor(private readonly loadMetricsService: LoadMetricsService) {}

    async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const metrics = await this.loadMetricsService.execute();
            return ok(metrics);
        } catch (err) {
            return serverError(err);
        }
    }
}
