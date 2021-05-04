import { Router } from 'express';
import etherapiesRouter from './etherapies.routes';
import testRouter from './test.routes';

const routes = Router();

routes.use('/etherapies', etherapiesRouter);
routes.use('/test', testRouter);

export default routes;
