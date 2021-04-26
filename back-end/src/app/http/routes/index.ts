import { Router } from 'express';
import etherapyRouter from './etherapy.routes';
import testRouter from './test.routes';

const routes = Router();

routes.use('/test', testRouter);
routes.use('/etherapy', etherapyRouter);

export default routes;
