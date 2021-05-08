import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeLinkModeratorsToEtherapiesContoller from '../../factories/controllers/makeLinkModeratorsToEtherapiesContoller';
import makeLinkTemplateToEtherapiesContoller from '../../factories/controllers/makeLinkTemplateToEtherapiesContoller';

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
