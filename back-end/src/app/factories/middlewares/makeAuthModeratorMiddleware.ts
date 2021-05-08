/* eslint-disable import/prefer-default-export */
import ModeratorTypeormRepository from '../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { AuthMiddleware } from '../../../presentation/middlewares/authMiddleware';
import { Middleware } from '../../../presentation/protocols/middleware';
import makeLoadUserByTokenService from '../services/makeLoadUserByTokenService';

export const makeAuthModeratorMiddleware = (role?: string): Middleware => {
    const moderatorRepostiroy = new ModeratorTypeormRepository();
    return new AuthMiddleware(
        makeLoadUserByTokenService(moderatorRepostiroy),
        role,
    );
};
