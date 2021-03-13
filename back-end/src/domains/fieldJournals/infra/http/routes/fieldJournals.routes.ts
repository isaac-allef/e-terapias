import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticatedAdministrator from '../../../../administrators/infra/http/middlewares/ensureAuthenticatedAdministrator';
import ensureAuthenticatedModerator from '../../../../moderators/infra/http/middlewares/ensureAuthenticatedModerator';
import FieldJournalAdministratorController from '../controllers/FieldJournalAdministratorController';
import FieldJournalModeratorController from '../controllers/FieldJournalModeratorController';

const fieldJournalAdministratorController = new FieldJournalAdministratorController();
const fieldJournalModeratorController = new FieldJournalModeratorController();

const fieldJournalsRoute = Router();

fieldJournalsRoute.use('*/administrator', ensureAuthenticatedAdministrator);
fieldJournalsRoute.use('*/moderator', ensureAuthenticatedModerator);

fieldJournalsRoute.get(
    '/administrator',
    fieldJournalAdministratorController.list,
);

fieldJournalsRoute.get(
    '/:id/administrator',
    fieldJournalAdministratorController.show,
);

fieldJournalsRoute.delete(
    '/:id/administrator',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    fieldJournalAdministratorController.delete,
);

///

fieldJournalsRoute.post(
    '/moderator',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            fields: Joi.array()
                .items(
                    Joi.object()
                        .keys({
                            name: Joi.string().required(),
                            type: Joi.string()
                                .valid('string', 'int', 'date', 'boolean')
                                .required(),
                            value: Joi.required(),
                        })
                        .required(),
                )
                .required(),
            eterapiaId: Joi.string().uuid().required(),
        },
    }),
    fieldJournalModeratorController.create,
);

fieldJournalsRoute.get('/moderator', fieldJournalModeratorController.list);

fieldJournalsRoute.get('/:id/moderator', fieldJournalModeratorController.show);

fieldJournalsRoute.put(
    '/:id/moderator',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            title: Joi.string(),
            updateFields: Joi.array().items(
                Joi.object()
                    .keys({
                        id: Joi.number().integer().min(0).required(),
                        value: Joi.required(),
                    })
                    .required(),
            ),
        },
    }),
    fieldJournalModeratorController.update,
);

fieldJournalsRoute.delete(
    '/:id/moderator',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    fieldJournalModeratorController.delete,
);

export default fieldJournalsRoute;
