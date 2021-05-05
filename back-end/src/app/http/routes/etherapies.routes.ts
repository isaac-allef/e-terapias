import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateEtherapiesContoller from '../../factories/makeCreateEtherapiesContoller';
import makeLoadEtherapyContoller from '../../factories/makeLoadEtherapyContoller';
import makeLoadAllEtherapiesContoller from '../../factories/makeLoadAllEtherapiesContoller';

const etherapiesRouter = Router();

etherapiesRouter.post('/', adapterRouter(makeCreateEtherapiesContoller()));
etherapiesRouter.get('/:id', adapterRouter(makeLoadEtherapyContoller()));
etherapiesRouter.get('/', adapterRouter(makeLoadAllEtherapiesContoller()));

export default etherapiesRouter;
