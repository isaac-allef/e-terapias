import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateTemplateContoller from '../../factories/controllers/userManager/makeCreateTemplateContoller';
import makeLoadTemplateContoller from '../../factories/controllers/shared/makeLoadTemplateContoller';

const templatesRouter = Router();

templatesRouter.post('/', adapterRouter(makeCreateTemplateContoller()));
templatesRouter.get('/:id', adapterRouter(makeLoadTemplateContoller()));

export default templatesRouter;
