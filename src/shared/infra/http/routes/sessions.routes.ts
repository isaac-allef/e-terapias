import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionAdministratorController from '../../../../domains/administrators/infra/http/controllers/SessionAdministratorController';
import SessionModeratorController from '../../../../domains/moderators/infra/http/controllers/SessionModeratorController';

const sessionsRouter = Router();
const sessionAdministratorController = new SessionAdministratorController();
const sessionModeratorController = new SessionModeratorController();

sessionsRouter.post(
    '/administrator',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    sessionAdministratorController.create,
);

sessionsRouter.post(
    '/moderator',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    sessionModeratorController.create,
);

export default sessionsRouter;
