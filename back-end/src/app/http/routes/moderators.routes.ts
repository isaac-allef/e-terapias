import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateModeratorsContoller from '../../factories/makeCreateModeratorsContoller';
import makeLoadModeratorContoller from '../../factories/makeLoadModeratorContoller';

const moderatorsRouter = Router();

moderatorsRouter.post('/', adapterRouter(makeCreateModeratorsContoller()));
moderatorsRouter.get('/:id', adapterRouter(makeLoadModeratorContoller()));

export default moderatorsRouter;
