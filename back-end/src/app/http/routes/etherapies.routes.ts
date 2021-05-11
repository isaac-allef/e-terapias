import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateEtherapiesContoller from '../../factories/controllers/userManager/makeCreateEtherapiesContoller';
import makeLoadEtherapyContoller from '../../factories/controllers/shared/makeLoadEtherapyContoller';
import makeLoadAllEtherapiesContoller from '../../factories/controllers/userManager/makeLoadAllEtherapiesContoller';
import makeSearchEtherapiesContoller from '../../factories/controllers/userManager/makeSearchEtherapiesContoller';
import makeLoadAllFieldJournalsPerEtherapyContoller from '../../factories/controllers/userManager/makeLoadAllFieldJournalsPerEtherapyContoller';

const etherapiesRouter = Router();

etherapiesRouter.post('/', adapterRouter(makeCreateEtherapiesContoller()));
etherapiesRouter.get(
    '/search/:keyword',
    adapterRouter(makeSearchEtherapiesContoller()),
);
etherapiesRouter.get('/:id', adapterRouter(makeLoadEtherapyContoller()));
etherapiesRouter.get('/', adapterRouter(makeLoadAllEtherapiesContoller()));
etherapiesRouter.get(
    '/:id/fieldJournals',
    adapterRouter(makeLoadAllFieldJournalsPerEtherapyContoller()),
);

export default etherapiesRouter;
