import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeTestContoller from '../../factories/makeTestContoller';

const testRouter = Router();

testRouter.get('/:id', adapterRouter(makeTestContoller()));

export default testRouter;
