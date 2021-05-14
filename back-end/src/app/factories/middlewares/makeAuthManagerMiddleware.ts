/* eslint-disable import/prefer-default-export */
import ManagerTypeormRepository from '../../../infra/db/typeorm/repositories/ManagerTypeormRepository';
import { AuthMiddleware } from '../../../presentation/middlewares/authMiddleware';
import { Middleware } from '../../../presentation/protocols/middleware';
import makeLoadUserByTokenService from '../services/makeLoadUserByTokenService';

export const makeAuthManagerMiddleware = (role?: string): Middleware => {
    const managerRepostiroy = new ManagerTypeormRepository();
    return new AuthMiddleware(
        makeLoadUserByTokenService(managerRepostiroy),
        role,
    );
};
