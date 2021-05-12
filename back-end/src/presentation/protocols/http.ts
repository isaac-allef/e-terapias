/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse {
    statusCode: number;
    body: any;
}

export interface HttpRequest {
    query?: any;
    params?: any;
    body?: any;
    headers?: any;
    userId?: string;
    userToken?: string;
}
