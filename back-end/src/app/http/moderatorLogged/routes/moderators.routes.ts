import { Router } from 'express';
import ensureAuthenticatedModerator from '../../administratorLogged/moderators/middlewares/ensureAuthenticatedModerator';
import ModeratorsController from '../controllers/ModeratorsController';

const moderatorsRoute = Router();
const moderatorsController = new ModeratorsController();

moderatorsRoute.get(
    '/',
    ensureAuthenticatedModerator,
    moderatorsController.show,
);

export default moderatorsRoute;
