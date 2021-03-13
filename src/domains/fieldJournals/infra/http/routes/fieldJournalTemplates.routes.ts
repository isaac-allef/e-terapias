import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticatedAdministrator from '../../../../administrators/infra/http/middlewares/ensureAuthenticatedAdministrator';
import FieldJournalTemplateController from '../controllers/FieldJournalTemplateController';

const fieldJournalTemplatesRoute = Router();
const fieldJournalTemplateController = new FieldJournalTemplateController();

fieldJournalTemplatesRoute.use(ensureAuthenticatedAdministrator);

fieldJournalTemplatesRoute.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.object()
                .keys({
                    title: Joi.string().required(),
                    fieldTemplates: Joi.array()
                        .items(
                            Joi.object().keys({
                                name: Joi.string().required(),
                                type: Joi.string()
                                    .required()
                                    .valid('string', 'int', 'date', 'boolean'),
                            }),
                        )
                        .required(),
                })
                .required(),
        },
    }),
    fieldJournalTemplateController.create,
);

fieldJournalTemplatesRoute.get('/', fieldJournalTemplateController.list);

fieldJournalTemplatesRoute.get('/:id', fieldJournalTemplateController.show);

fieldJournalTemplatesRoute.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    fieldJournalTemplateController.delete,
);

export default fieldJournalTemplatesRoute;
