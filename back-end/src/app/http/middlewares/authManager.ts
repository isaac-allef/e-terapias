/* eslint-disable import/prefer-default-export */
import { makeAuthManagerMiddleware } from '../../factories/middlewares/makeAuthManagerMiddleware';
import adapterMiddleware from '../adapters/expressMiddleware';

export const authManager = adapterMiddleware(makeAuthManagerMiddleware());
