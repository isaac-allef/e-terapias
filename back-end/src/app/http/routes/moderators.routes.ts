import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateModeratorsContoller from '../../factories/controllers/userManager/makeCreateModeratorsContoller';
import makeLoadModeratorContoller from '../../factories/controllers/shared/makeLoadModeratorContoller';
import makeLoadMeModeratorContoller from '../../factories/controllers/userModerator/makeLoadMeModeratorContoller';
import adapterMiddleware from '../adapters/expressMiddleware';
import { makeAuthModeratorMiddleware } from '../../factories/middlewares/makeAuthModeratorMiddleware';
import makeLoadAllFieldJournalsPerMeModeratorContoller from '../../factories/controllers/userModerator/makeLoadAllFieldJournalsPerMeModeratorContoller';
import makeLoadAllFieldJournalsPerModeratorContoller from '../../factories/controllers/userManager/makeLoadAllFieldJournalsPerModeratorContoller';
import makeSearchFieldJournalsPerMeModeratorContoller from '../../factories/controllers/userModerator/makeSearchFieldJournalsPerMeModeratorContoller';
import makeChangePasswordModeratorContoller from '../../factories/controllers/userModerator/makeChangePasswordModeratorContoller';

const moderatorsRouter = Router();

moderatorsRouter.post('/', adapterRouter(makeCreateModeratorsContoller()));
moderatorsRouter.get(
    '/me',
    adapterMiddleware(makeAuthModeratorMiddleware()),
    adapterRouter(makeLoadMeModeratorContoller()),
);
moderatorsRouter.get(
    '/me/fieldJournals',
    adapterMiddleware(makeAuthModeratorMiddleware()),
    adapterRouter(makeLoadAllFieldJournalsPerMeModeratorContoller()),
);
moderatorsRouter.get('/:id', adapterRouter(makeLoadModeratorContoller()));
moderatorsRouter.get(
    '/:id/fieldJournals',
    adapterRouter(makeLoadAllFieldJournalsPerModeratorContoller()),
);
moderatorsRouter.get(
    '/me/fieldJournals/search/:keyword',
    adapterMiddleware(makeAuthModeratorMiddleware()),
    adapterRouter(makeSearchFieldJournalsPerMeModeratorContoller()),
);

moderatorsRouter.patch(
    '/me/changePassword',
    adapterMiddleware(makeAuthModeratorMiddleware()),
    adapterRouter(makeChangePasswordModeratorContoller()),
);

export default moderatorsRouter;
