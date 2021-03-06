import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticatedAdministrator from '../../../../administrators/infra/http/middlewares/ensureAuthenticatedAdministrator';
import EterapiaController from '../controllers/EterapiaController';

const eterapiasRoute = Router();
const eterapiaController = new EterapiaController();

eterapiasRoute.use(ensureAuthenticatedAdministrator);

eterapiasRoute.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
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
