import { celebrate, errors, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import makeLoadOfferContoller from '../../factories/controllers/shared/makeLoadOfferContoller';
import makeCreateOfferController from '../../factories/controllers/userManager/makeCreateOfferController';
import makeLoadAllOffersContoller from '../../factories/controllers/userManager/makeLoadAllOffersContoller';
import makeUpdateOfferController from '../../factories/controllers/userManager/makeUpdateOfferController';
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
                    sheet_index: Joi.number(),
                    column_email: Joi.string(),
                    column_name: Joi.string(),
                    column_etherapies_identifiers: Joi.string(),
                }),
                etherapies: Joi.object().keys({
                    sheet_link: Joi.string(),
                    sheet_index: Joi.number(),
                    column_identifier: Joi.string(),
                    column_name: Joi.string(),
                }),
                participants: Joi.object().keys({
                    sheet_link: Joi.string(),
                    sheet_index: Joi.number(),
                }),
            }),
        }),
    }),
    authManager,
    adapterRouter(makeCreateOfferController()),
);

offerRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().required(),
        }),
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(),
            dateStart: Joi.date(),
            dateEnd: Joi.date(),
            settings: Joi.object().keys({
                serviceAccount: Joi.object().keys({
                    client_email: Joi.string(),
                    private_key: Joi.string(),
                }),
                moderators: Joi.object().keys({
                    sheet_link: Joi.string(),
                    sheet_index: Joi.number(),
                    column_email: Joi.string(),
                    column_name: Joi.string(),
                    column_etherapies_identifiers: Joi.string(),
                }),
                etherapies: Joi.object().keys({
                    sheet_link: Joi.string(),
                    sheet_index: Joi.number(),
                    column_identifier: Joi.string(),
                    column_name: Joi.string(),
                }),
                participants: Joi.object().keys({
                    sheet_link: Joi.string(),
                    sheet_index: Joi.number(),
                }),
            }),
        }),
    }),
    authManager,
    adapterRouter(makeUpdateOfferController()),
);

offerRouter.get('/:id', authManager, adapterRouter(makeLoadOfferContoller()));

offerRouter.get('/', authManager, adapterRouter(makeLoadAllOffersContoller()));

offerRouter.use(errors());

export default offerRouter;
