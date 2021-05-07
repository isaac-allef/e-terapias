import { HttpRequest, HttpResponse } from './http';

export interface Middelware {
    handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
