/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import { Controller } from '../../../presentation/protocols/controller';
import { HttpRequest } from '../../../presentation/protocols/http';

const adapterRouter = (controller: Controller) => {
    return async (request: Request, response: Response) => {
        const httpRequest: HttpRequest = {
            query: request.query,
            params: request.params,
            body: request.body,
            userId: request.userId,
        };
        const httpResponse = await controller.handle(httpRequest);
        response.status(httpResponse.statusCode).json(httpResponse.body);
    };
};

export default adapterRouter;
