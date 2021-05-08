import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateEtherapiesContoller from '../../factories/controllers/makeCreateEtherapiesContoller';
import makeLoadEtherapyContoller from '../../factories/controllers/makeLoadEtherapyContoller';
import makeLoadAllEtherapiesContoller from '../../factories/controllers/makeLoadAllEtherapiesContoller';
import makeSearchEtherapiesContoller from '../../factories/controllers/makeSearchEtherapiesContoller';

const etherapiesRouter = Router();

etherapiesRouter.post('/', adapterRouter(makeCreateEtherapiesContoller()));
etherapiesRouter.get(
    '/search/:keyword',
    adapterRouter(makeSearchEtherapiesContoller()),
);
etherapiesRouter.get('/:id', adapterRouter(makeLoadEtherapyContoller()));
etherapiesRouter.get('/', adapterRouter(makeLoadAllEtherapiesContoller()));

export default etherapiesRouter;
