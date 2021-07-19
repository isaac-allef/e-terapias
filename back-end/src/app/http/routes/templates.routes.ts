import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateTemplateContoller from '../../factories/controllers/userManager/makeCreateTemplateContoller';
import makeLoadTemplateContoller from '../../factories/controllers/shared/makeLoadTemplateContoller';
import makeUpdateTemplateContoller from '../../factories/controllers/userManager/makeUpdateTemplateContoller';
import makeLoadAllTemplatesContoller from '../../factories/controllers/userManager/makeLoadAllTemplatesContoller';
import makeSearchTemplatesContoller from '../../factories/controllers/userManager/makeSearchTemplatesContoller';
import { authManager } from '../middlewares/authManager';
import makeDeleteTemplateContoller from '../../factories/controllers/userManager/makeDeleteTemplateContoller';

const templatesRouter = Router();

templatesRouter.post(
    '/',
    authManager,
    adapterRouter(makeCreateTemplateContoller()),
);
templatesRouter.get(
    '/',
    authManager,
    adapterRouter(makeLoadAllTemplatesContoller()),
);
templatesRouter.get(
    '/:id',
    authManager,
    adapterRouter(makeLoadTemplateContoller()),
);
templatesRouter.put(
    '/:id',
    authManager,
    adapterRouter(makeUpdateTemplateContoller()),
);
templatesRouter.get(
    '/search/:keywords',
    authManager,
    adapterRouter(makeSearchTemplatesContoller()),
);

templatesRouter.delete(
    '/:id',
    authManager,
    adapterRouter(makeDeleteTemplateContoller()),
);

export default templatesRouter;
