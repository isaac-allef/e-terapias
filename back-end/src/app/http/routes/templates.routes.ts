import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateTemplateContoller from '../../factories/controllers/makeCreateTemplateContoller';
import makeLoadTemplateContoller from '../../factories/controllers/makeLoadTemplateContoller';

const templatesRouter = Router();

templatesRouter.post('/', adapterRouter(makeCreateTemplateContoller()));
templatesRouter.get('/:id', adapterRouter(makeLoadTemplateContoller()));

export default templatesRouter;
