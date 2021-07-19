import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateFieldJournalContoller from '../../factories/controllers/userModerator/makeCreateFieldJournalContoller';
import makeLoadFieldJournalContoller from '../../factories/controllers/shared/makeLoadFieldJournalContoller';
import makeUpdateFieldJournalContoller from '../../factories/controllers/userModerator/makeUpdateFieldJournalContoller';
import makeLoadAllFieldJournalsContoller from '../../factories/controllers/userManager/makeLoadAllFieldJournalsContoller';
import makeSearchFieldJournalsContoller from '../../factories/controllers/userManager/makeSearchFieldJournalsContoller';
import { authModerator } from '../middlewares/authModerator';
import { authManager } from '../middlewares/authManager';
import makeDeleteFieldJournalContoller from '../../factories/controllers/userManager/makeDeleteFieldJournalContoller';

const fieldJournalsRouter = Router();

fieldJournalsRouter.post(
    '/',
    authModerator,
    adapterRouter(makeCreateFieldJournalContoller()),
);

fieldJournalsRouter.get(
    '/',
    authManager,
    adapterRouter(makeLoadAllFieldJournalsContoller()),
);

fieldJournalsRouter.get(
    '/:id',
    authManager,
    adapterRouter(makeLoadFieldJournalContoller()),
);

fieldJournalsRouter.put(
    '/:id',
    authModerator,
    adapterRouter(makeUpdateFieldJournalContoller()),
);

fieldJournalsRouter.get(
    '/search/:keywords',
    authManager,
    adapterRouter(makeSearchFieldJournalsContoller()),
);

fieldJournalsRouter.delete(
    '/:id',
    authManager,
    adapterRouter(makeDeleteFieldJournalContoller()),
);

export default fieldJournalsRouter;
