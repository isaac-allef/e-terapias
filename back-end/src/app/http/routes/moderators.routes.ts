import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeUploadModeratorsListContoller from '../../factories/controllers/userManager/makeUploadModeratorsListContoller';
import makeLoadModeratorContoller from '../../factories/controllers/shared/makeLoadModeratorContoller';
import makeLoadMeModeratorContoller from '../../factories/controllers/userModerator/makeLoadMeModeratorContoller';
import makeLoadAllFieldJournalsPerMeModeratorContoller from '../../factories/controllers/userModerator/makeLoadAllFieldJournalsPerMeModeratorContoller';
import makeLoadAllFieldJournalsPerModeratorContoller from '../../factories/controllers/userManager/makeLoadAllFieldJournalsPerModeratorContoller';
import makeSearchFieldJournalsPerMeModeratorContoller from '../../factories/controllers/userModerator/makeSearchFieldJournalsPerMeModeratorContoller';
import makeChangePasswordModeratorContoller from '../../factories/controllers/userModerator/makeChangePasswordModeratorContoller';
import makeLoadAllModeratorsContoller from '../../factories/controllers/userManager/makeLoadAllModeratorsContoller';
import makeSearchModeratorsContoller from '../../factories/controllers/userManager/makeSearchModeratorsContoller';
import { authModerator } from '../middlewares/authModerator';
import { authManager } from '../middlewares/authManager';
import makeLoadFieldJournalPerMeModeratorContoller from '../../factories/controllers/userModerator/makeLoadFieldJournalPerMeModeratorContoller';
import makeDeleteModeratorContoller from '../../factories/controllers/userManager/makeDeleteModeratorContoller';

const moderatorsRouter = Router();

moderatorsRouter.post(
    '/',
    authManager,
    adapterRouter(makeUploadModeratorsListContoller()),
);

moderatorsRouter.get(
    '/',
    authManager,
    adapterRouter(makeLoadAllModeratorsContoller()),
);

moderatorsRouter.get(
    '/me',
    authModerator,
    adapterRouter(makeLoadMeModeratorContoller()),
);

moderatorsRouter.get(
    '/me/fieldJournals',
    authModerator,
    adapterRouter(makeLoadAllFieldJournalsPerMeModeratorContoller()),
);

moderatorsRouter.get(
    '/me/fieldJournals/:id',
    authModerator,
    adapterRouter(makeLoadFieldJournalPerMeModeratorContoller()),
);

moderatorsRouter.get(
    '/:id',
    authManager,
    adapterRouter(makeLoadModeratorContoller()),
);

moderatorsRouter.get(
    '/:id/fieldJournals',
    authManager,
    adapterRouter(makeLoadAllFieldJournalsPerModeratorContoller()),
);

moderatorsRouter.get(
    '/search/:keywords',
    authManager,
    adapterRouter(makeSearchModeratorsContoller()),
);

moderatorsRouter.get(
    '/me/fieldJournals/search/:keywords',
    authModerator,
    adapterRouter(makeSearchFieldJournalsPerMeModeratorContoller()),
);

moderatorsRouter.patch(
    '/me/changePassword',
    authModerator,
    adapterRouter(makeChangePasswordModeratorContoller()),
);

moderatorsRouter.delete(
    '/:id',
    authManager,
    adapterRouter(makeDeleteModeratorContoller()),
);

export default moderatorsRouter;
