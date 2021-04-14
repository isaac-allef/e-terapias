import { Router } from 'express';
import ensureAuthenticatedModerator from '../../../../moderators/infra/http/middlewares/ensureAuthenticatedModerator';
import ModeratorsController from '../controllers/ModeratorsController';

const moderatorsRoute = Router();
const moderatorsController = new ModeratorsController();

moderatorsRoute.get(
    '/',
    ensureAuthenticatedModerator,
    moderatorsController.show,
);

export default moderatorsRoute;
