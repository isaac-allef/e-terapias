import { Router } from 'express';
import makeLoginManagerContoller from '../../factories/controllers/public/makeLoginManagerContoller';
import makeLoginModeratorContoller from '../../factories/controllers/public/makeLoginModeratorContoller';
import adapterRouter from '../adapters/expressRouter';

const loginRouter = Router();

loginRouter.post('/moderator', adapterRouter(makeLoginModeratorContoller()));
loginRouter.post('/manager', adapterRouter(makeLoginManagerContoller()));

export default loginRouter;
