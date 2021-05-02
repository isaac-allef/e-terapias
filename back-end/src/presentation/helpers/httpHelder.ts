/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { ServerError } from '../erros/ServerError';
import { UnauthorizedError } from '../erros/UnauthorizedError';
import { HttpResponse } from '../protocols/http';

/* eslint-disable import/prefer-default-export */
export const badRequest = (error: Error): HttpResponse => {
    return {
        statusCode: 400,
        body: error,
    };
};

export const unauthorized = (): HttpResponse => {
    return {
        statusCode: 401,
        body: new UnauthorizedError(),
    };
};

export const serverError = (error: Error): HttpResponse => {
    return {
        statusCode: 500,
        body: new ServerError(error.stack),
    };
};

export const ok = (data: any): HttpResponse => {
    return {
        statusCode: 200,
        body: data,
    };
};
