import { celebrate, errors, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import makeCreateOfferController from '../../factories/controllers/userManager/makeCreateOfferController';
import adapterRouter from '../adapters/expressRouter';
import { authManager } from '../middlewares/authManager';

const offerRouter = Router();

offerRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            dateStart: Joi.date().required(),
            dateEnd: Joi.date().required(),
            settings: Joi.object().keys({
                serviceAccount: Joi.object().keys({
                    client_email: Joi.string(),
                    private_key: Joi.string(),
                }),
                moderators: Joi.object().keys({
                    sheet_link: Joi.string(),
                    column_email: Joi.string(),
                    column_name: Joi.string(),
                    column_etherapies_identifiers: Joi.string(),
                }),
                etherapies: Joi.object().keys({
                    sheet_link: Joi.string(),
                    column_identifier: Joi.string(),
                    column_name: Joi.string(),
                }),
            }),
        }),
    }),
    authManager,
    adapterRouter(makeCreateOfferController()),
);

offerRouter.use(errors());

export default offerRouter;
