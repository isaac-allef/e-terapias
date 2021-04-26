import { Router } from 'express';
import testRouter from './test.routes';

const routes = Router();

routes.use('/test', testRouter);

export default routes;
