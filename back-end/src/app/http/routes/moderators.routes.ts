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

const moderatorsRouter = Router();

moderatorsRouter.post('/', adapterRouter(makeUploadModeratorsListContoller()));

moderatorsRouter.get('/', adapterRouter(makeLoadAllModeratorsContoller()));

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

moderatorsRouter.get('/:id', adapterRouter(makeLoadModeratorContoller()));

moderatorsRouter.get(
    '/:id/fieldJournals',
    adapterRouter(makeLoadAllFieldJournalsPerModeratorContoller()),
);

moderatorsRouter.get(
    '/search/:keyword',
    adapterRouter(makeSearchModeratorsContoller()),
);

moderatorsRouter.get(
    '/me/fieldJournals/search/:keyword',
    authModerator,
    adapterRouter(makeSearchFieldJournalsPerMeModeratorContoller()),
);

moderatorsRouter.patch(
    '/me/changePassword',
    authModerator,
    adapterRouter(makeChangePasswordModeratorContoller()),
);

export default moderatorsRouter;
