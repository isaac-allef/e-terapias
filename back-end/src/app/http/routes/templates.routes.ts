import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateTemplateContoller from '../../factories/controllers/userManager/makeCreateTemplateContoller';
import makeLoadTemplateContoller from '../../factories/controllers/shared/makeLoadTemplateContoller';
import makeUpdateTemplateContoller from '../../factories/controllers/userManager/makeUpdateTemplateContoller';

const templatesRouter = Router();

templatesRouter.post('/', adapterRouter(makeCreateTemplateContoller()));
templatesRouter.get('/:id', adapterRouter(makeLoadTemplateContoller()));
templatesRouter.put('/:id', adapterRouter(makeUpdateTemplateContoller()));

export default templatesRouter;
