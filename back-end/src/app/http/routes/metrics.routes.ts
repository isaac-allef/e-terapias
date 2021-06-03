import { Router } from 'express';
import makeLoadMetricsContoller from '../../factories/controllers/userManager/makeLoadMetricsController';
import adapterRouter from '../adapters/expressRouter';
import { authManager } from '../middlewares/authManager';

const metricsRouter = Router();

metricsRouter.get('/', authManager, adapterRouter(makeLoadMetricsContoller()));

export default metricsRouter;
