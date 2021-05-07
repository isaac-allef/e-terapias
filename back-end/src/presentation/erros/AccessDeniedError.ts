/* eslint-disable import/prefer-default-export */
export class AccessDeniedError extends Error {
    constructor() {
        super('Acesss denied');
        this.name = 'AccessDeniedError';
    }
}
