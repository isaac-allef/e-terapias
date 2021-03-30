import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AdministratorController from '../controllers/AdministratorController';
import ensureAuthenticatedAdministrator from '../middlewares/ensureAuthenticatedAdministrator';

const administratorsRoute = Router();
const administratorController = new AdministratorController();

administratorsRoute.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    administratorController.create,
);

administratorsRoute.use(ensureAuthenticatedAdministrator);

administratorsRoute.get('/', administratorController.list);

administratorsRoute.get('/:id', administratorController.show);

administratorsRoute.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            email: Joi.string().email(),
            password: Joi.string(),
        },
    }),
    administratorController.update,
);

administratorsRoute.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    administratorController.delete,
);

export default administratorsRoute;
