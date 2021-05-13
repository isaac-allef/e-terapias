/* eslint-disable import/prefer-default-export */
import { makeAuthModeratorMiddleware } from '../../factories/middlewares/makeAuthModeratorMiddleware';
import adapterMiddleware from '../adapters/expressMiddleware';

export const authModerator = adapterMiddleware(makeAuthModeratorMiddleware());
