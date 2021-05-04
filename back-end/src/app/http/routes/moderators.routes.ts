import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateModeratorsContoller from '../../factories/makeCreateModeratorsContoller';

const moderatorsRouter = Router();

moderatorsRouter.post('/', adapterRouter(makeCreateModeratorsContoller()));

export default moderatorsRouter;
