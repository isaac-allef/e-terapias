import { Router } from 'express';
import SessionAdministratorController from '../../../domains/administrators/infra/http/controllers/SessionAdministratorController';
import SessionModeratorController from '../../../domains/moderators/infra/http/controllers/SessionModeratorController';

const sessionsRouter = Router();
const sessionAdministratorController = new SessionAdministratorController();
const sessionModeratorController = new SessionModeratorController();

sessionsRouter.post('/administrator', sessionAdministratorController.create);

sessionsRouter.post('/moderator', sessionModeratorController.create);

export default sessionsRouter;
