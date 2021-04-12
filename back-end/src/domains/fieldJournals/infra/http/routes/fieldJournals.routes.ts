import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticatedAdministrator from '../../../../administrators/infra/http/middlewares/ensureAuthenticatedAdministrator';
import FieldJournalAdministratorController from '../controllers/FieldJournalsController';

const fieldJournalAdministratorController = new FieldJournalAdministratorController();

const fieldJournalsRoute = Router();

fieldJournalsRoute.use(ensureAuthenticatedAdministrator);

fieldJournalsRoute.get('/', fieldJournalAdministratorController.list);

fieldJournalsRoute.get('/:id', fieldJournalAdministratorController.show);

fieldJournalsRoute.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    fieldJournalAdministratorController.delete,
);

export default fieldJournalsRoute;
