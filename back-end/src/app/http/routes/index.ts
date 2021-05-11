import { Router } from 'express';
import etherapiesRouter from './etherapies.routes';
import moderatorsRouter from './moderators.routes';
import templatesRouter from './templates.routes';
import fieldJournalsRouter from './fieldJournals.routes';
import loginRouter from './login.routes';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/etherapies', etherapiesRouter);
routes.use('/moderators', moderatorsRouter);
routes.use('/templates', templatesRouter);
routes.use('/fieldJournals', fieldJournalsRouter);

export default routes;
