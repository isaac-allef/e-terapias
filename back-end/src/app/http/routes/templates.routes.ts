import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateTemplateContoller from '../../factories/controllers/userManager/makeCreateTemplateContoller';
import makeLoadTemplateContoller from '../../factories/controllers/shared/makeLoadTemplateContoller';
import makeUpdateTemplateContoller from '../../factories/controllers/userManager/makeUpdateTemplateContoller';
import makeLoadAllTemplatesContoller from '../../factories/controllers/userManager/makeLoadAllTemplatesContoller';
import makeSearchTemplatesContoller from '../../factories/controllers/userManager/makeSearchTemplatesContoller';

const templatesRouter = Router();

templatesRouter.post('/', adapterRouter(makeCreateTemplateContoller()));
templatesRouter.get('/', adapterRouter(makeLoadAllTemplatesContoller()));
templatesRouter.get('/:id', adapterRouter(makeLoadTemplateContoller()));
templatesRouter.put('/:id', adapterRouter(makeUpdateTemplateContoller()));
templatesRouter.get(
    '/search/:keyword',
    adapterRouter(makeSearchTemplatesContoller()),
);

export default templatesRouter;
