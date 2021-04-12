import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticatedModerator from '../../../../moderators/infra/http/middlewares/ensureAuthenticatedModerator';
import ModeratorsFieldJournalsController from '../controllers/ModeratorsFieldJournalsController';

const moderatorsFieldJournalsController = new ModeratorsFieldJournalsController();

const moderatorsFieldJournalsRoute = Router();

moderatorsFieldJournalsRoute.use(ensureAuthenticatedModerator);

moderatorsFieldJournalsRoute.post(
    '/',
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
    moderatorsFieldJournalsController.create,
);

moderatorsFieldJournalsRoute.get('/', moderatorsFieldJournalsController.list);

moderatorsFieldJournalsRoute.get(
    '/:id',
    moderatorsFieldJournalsController.show,
);

moderatorsFieldJournalsRoute.put(
    '/:id',
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
    moderatorsFieldJournalsController.update,
);

moderatorsFieldJournalsRoute.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    moderatorsFieldJournalsController.delete,
);

export default moderatorsFieldJournalsRoute;
