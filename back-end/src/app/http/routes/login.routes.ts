import { Router } from 'express';
import makeLoginContoller from '../../factories/makeLoginContoller';
import adapterRouter from '../adapters/expressRouter';

const loginRouter = Router();

loginRouter.post('/', adapterRouter(makeLoginContoller()));

export default loginRouter;
