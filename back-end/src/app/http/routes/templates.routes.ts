import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateTemplateContoller from '../../factories/makeCreateTemplateContoller';

const templatesRouter = Router();

templatesRouter.post('/', adapterRouter(makeCreateTemplateContoller()));

export default templatesRouter;
