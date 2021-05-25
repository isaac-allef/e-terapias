import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeUploadEtherapiesListContoller from '../../factories/controllers/userManager/makeUploadEtherapiesListContoller';
import makeLoadEtherapyContoller from '../../factories/controllers/shared/makeLoadEtherapyContoller';
import makeLoadAllEtherapiesContoller from '../../factories/controllers/userManager/makeLoadAllEtherapiesContoller';
import makeSearchEtherapiesContoller from '../../factories/controllers/userManager/makeSearchEtherapiesContoller';
import makeLoadAllFieldJournalsPerEtherapyContoller from '../../factories/controllers/userManager/makeLoadAllFieldJournalsPerEtherapyContoller';
import { authManager } from '../middlewares/authManager';

const etherapiesRouter = Router();

etherapiesRouter.post(
    '/',
    authManager,
    adapterRouter(makeUploadEtherapiesListContoller()),
);

etherapiesRouter.get(
    '/search/:keywords',
    authManager,
    adapterRouter(makeSearchEtherapiesContoller()),
);

etherapiesRouter.get(
    '/:id',
    authManager,
    adapterRouter(makeLoadEtherapyContoller()),
);

etherapiesRouter.get(
    '/',
    authManager,
    adapterRouter(makeLoadAllEtherapiesContoller()),
);

etherapiesRouter.get(
    '/:id/fieldJournals',
    authManager,
    adapterRouter(makeLoadAllFieldJournalsPerEtherapyContoller()),
);

export default etherapiesRouter;
