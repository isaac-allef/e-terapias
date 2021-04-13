import { Router } from 'express';
import ensureAuthenticatedModerator from '../../../../moderators/infra/http/middlewares/ensureAuthenticatedModerator';
import ModeratorsEterapiasController from '../controllers/ModeratorsEterapiasController';

const moderatorsEterapiasRoute = Router();
const moderatorsEterapiasController = new ModeratorsEterapiasController();

moderatorsEterapiasRoute.get(
    '/',
    ensureAuthenticatedModerator,
    moderatorsEterapiasController.list,
);

moderatorsEterapiasRoute.get(
    '/:id',
    ensureAuthenticatedModerator,
    moderatorsEterapiasController.show,
);

export default moderatorsEterapiasRoute;
