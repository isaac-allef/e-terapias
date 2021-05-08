import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateModeratorsContoller from '../../factories/controllers/makeCreateModeratorsContoller';
import makeLoadModeratorContoller from '../../factories/controllers/makeLoadModeratorContoller';

const moderatorsRouter = Router();

moderatorsRouter.post('/', adapterRouter(makeCreateModeratorsContoller()));
moderatorsRouter.get('/:id', adapterRouter(makeLoadModeratorContoller()));

export default moderatorsRouter;
