/* eslint-disable import/prefer-default-export */
import ChangePasswordModeratorService from '../../core/services/ChangePasswordModeratorService';
import { MissingParamError } from '../erros/missingParamError';
import { badRequest, ok, serverError } from '../helpers/httpHelder';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class ChangePasswordModeratorController implements Controller {
    constructor(
        private readonly changePasswordModeratorService: ChangePasswordModeratorService,
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const id = httpRequest.userId;
            const {
                currentPassword,
                newPassword,
                newPasswordConfirmation,
            } = httpRequest.body;

            if (!id) {
                return badRequest(new MissingParamError('id'));
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

            const moderators = await this.changePasswordModeratorService.execute(
                {
                    id,
                    currentPassword,
                    newPassword,
                    newPasswordConfirmation,
                },
            );
            return ok(moderators);
        } catch (err) {
            return serverError(err);
        }
    }
}
