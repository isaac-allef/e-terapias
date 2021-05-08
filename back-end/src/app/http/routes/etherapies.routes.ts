import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateEtherapiesContoller from '../../factories/controllers/userManager/makeCreateEtherapiesContoller';
import makeLoadEtherapyContoller from '../../factories/controllers/shared/makeLoadEtherapyContoller';
import makeLoadAllEtherapiesContoller from '../../factories/controllers/userManager/makeLoadAllEtherapiesContoller';
import makeSearchEtherapiesContoller from '../../factories/controllers/userManager/makeSearchEtherapiesContoller';

const etherapiesRouter = Router();

etherapiesRouter.post('/', adapterRouter(makeCreateEtherapiesContoller()));
etherapiesRouter.get(
    '/search/:keyword',
    adapterRouter(makeSearchEtherapiesContoller()),
);
etherapiesRouter.get('/:id', adapterRouter(makeLoadEtherapyContoller()));
etherapiesRouter.get('/', adapterRouter(makeLoadAllEtherapiesContoller()));

export default etherapiesRouter;
