import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeLinkModeratorsToEtherapiesContoller from '../../factories/makeLinkModeratorsToEtherapiesContoller';
import makeLinkTemplateToEtherapiesContoller from '../../factories/makeLinkTemplateToEtherapiesContoller';

const linksRouter = Router();

linksRouter.post(
    '/moderators/etherapies',
    adapterRouter(makeLinkModeratorsToEtherapiesContoller()),
);

linksRouter.post(
    '/template/etherapies',
    adapterRouter(makeLinkTemplateToEtherapiesContoller()),
);

export default linksRouter;
