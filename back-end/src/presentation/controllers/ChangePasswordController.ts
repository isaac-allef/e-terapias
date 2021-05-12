/* eslint-disable import/prefer-default-export */
import ChangePasswordService from '../../core/services/ChangePasswordService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class ChangePasswordController implements Controller {
    constructor(
        private readonly changePasswordService: ChangePasswordService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const token = httpRequest.userToken;
            const {
                currentPassword,
                newPassword,
                newPasswordConfirmation,
            } = httpRequest.body;

            if (!token) {
                return badRequest(new MissingParamError('token'));
            }

            if (!currentPassword) {
                return badRequest(new MissingParamError('currentPassword'));
            }

            if (!newPassword) {
                return badRequest(new MissingParamError('newPassword'));
            }

            if (!newPasswordConfirmation) {
                return badRequest(
                    new MissingParamError('newPasswordConfirmation'),
                );
            }

            const isChange = await this.changePasswordService.execute({
                token,
                currentPassword,
                newPassword,
                newPasswordConfirmation,
            });
            return ok(isChange);
        } catch (err) {
            return serverError(err);
        }
    }
}
