import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticatedAdministrator from '../../../../administrators/infra/http/middlewares/ensureAuthenticatedAdministrator';
import ModeratorController from '../controllers/ModeratorController';
import RelationModeratorEterapiaController from '../controllers/RelationModeratorEterapiaController';

const moderatorsRoute = Router();
const moderatorController = new ModeratorController();
const relationModeratorEterapiaController = new RelationModeratorEterapiaController();

moderatorsRoute.use(ensureAuthenticatedAdministrator);

moderatorsRoute.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    moderatorController.create,
);

moderatorsRoute.get('/', moderatorController.list);

moderatorsRoute.get('/:id', moderatorController.show);

moderatorsRoute.put(
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
    moderatorController.update,
);

moderatorsRoute.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    moderatorController.delete,
);

moderatorsRoute.patch(
    '/addEterapia',
    celebrate({
        [Segments.BODY]: {
            moderatorId: Joi.string().uuid().required(),
            eterapiaId: Joi.string().uuid().required(),
        },
    }),
    relationModeratorEterapiaController.create,
);

moderatorsRoute.patch(
    '/dropEterapia',
    celebrate({
        [Segments.BODY]: {
            moderatorId: Joi.string().uuid().required(),
            eterapiaId: Joi.string().uuid().required(),
        },
    }),
    relationModeratorEterapiaController.delete,
);

export default moderatorsRoute;
