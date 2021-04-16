import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticatedAdministrator from '../../administrators/middlewares/ensureAuthenticatedAdministrator';
import FieldJournalsController from '../controllers/FieldJournalsController';

const fieldJournalsController = new FieldJournalsController();

const fieldJournalsRoute = Router();

fieldJournalsRoute.use(ensureAuthenticatedAdministrator);

fieldJournalsRoute.get('/', fieldJournalsController.list);

fieldJournalsRoute.get('/:id', fieldJournalsController.show);

fieldJournalsRoute.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    fieldJournalsController.delete,
);

export default fieldJournalsRoute;
