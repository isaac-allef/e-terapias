import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeLinkModeratorsToEtherapiesContoller from '../../factories/makeLinkModeratorsToEtherapiesContoller';

const linksRouter = Router();

linksRouter.post(
    '/moderators/etherapies',
    adapterRouter(makeLinkModeratorsToEtherapiesContoller()),
);

export default linksRouter;
