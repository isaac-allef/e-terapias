import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateEtherapiesContoller from '../../factories/makeCreateEtherapiesContoller';

const etherapiesRouter = Router();

etherapiesRouter.post('/', adapterRouter(makeCreateEtherapiesContoller()));

export default etherapiesRouter;
