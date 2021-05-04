import { Router } from 'express';
import etherapiesRouter from './etherapies.routes';
import moderatorsRouter from './moderators.routes';
import templatesRouter from './templates.routes';
import linksRouter from './links.routes';
import testRouter from './test.routes';
import fieldJournalsRouter from './fieldJournals.routes';

const routes = Router();

routes.use('/etherapies', etherapiesRouter);
routes.use('/moderators', moderatorsRouter);
routes.use('/templates', templatesRouter);
routes.use('/links', linksRouter);
routes.use('/fieldJournals', fieldJournalsRouter);
routes.use('/test', testRouter);

export default routes;
