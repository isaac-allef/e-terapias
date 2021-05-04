import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateEtherapiesContoller from '../../factories/makeCreateEtherapiesContoller';
import makeLoadEtherapyContoller from '../../factories/makeLoadEtherapyContoller';

const etherapiesRouter = Router();

etherapiesRouter.post('/', adapterRouter(makeCreateEtherapiesContoller()));
etherapiesRouter.get('/:id', adapterRouter(makeLoadEtherapyContoller()));

export default etherapiesRouter;
