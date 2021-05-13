import { Router } from 'express';
import makeUploadManagersListContoller from '../../factories/controllers/userManager/makeUploadManagersListContoller';
import adapterRouter from '../adapters/expressRouter';

const managersRouter = Router();

managersRouter.post('/', adapterRouter(makeUploadManagersListContoller()));

export default managersRouter;
