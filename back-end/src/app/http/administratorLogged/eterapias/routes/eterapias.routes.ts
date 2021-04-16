import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticatedAdministrator from '../../administrators/middlewares/ensureAuthenticatedAdministrator';
import EterapiasController from '../controllers/EterapiasController';

const eterapiasRoute = Router();
const eterapiaController = new EterapiasController();

eterapiasRoute.use(ensureAuthenticatedAdministrator);

eterapiasRoute.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            fieldJournalTemplateId: Joi.string(),
        },
    }),
    eterapiaController.create,
);

eterapiasRoute.get('/', eterapiaController.list);

eterapiasRoute.get('/:id', eterapiaController.show);

eterapiasRoute.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string(),
            fieldJournalTemplateId: Joi.string().uuid(),
        },
    }),
    eterapiaController.update,
);

eterapiasRoute.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    eterapiaController.delete,
);

export default eterapiasRoute;
