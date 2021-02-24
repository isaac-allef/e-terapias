import { Router } from 'express';
import administratorsRoute from './administrators.routes';
import eterapiasRoute from './eterapias.routes';
import fieldJournalsRoute from './fieldJournals.routes';
import fieldJournalTemplatesRoute from './fieldJournalTemplates.routes';
import moderatorsRoute from './moderators.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/administrators', administratorsRoute);
routes.use('/eterapias', eterapiasRoute);
routes.use('/fieldjournaltemplates', fieldJournalTemplatesRoute);
routes.use('/moderators', moderatorsRoute);
routes.use('/fieldjournals', fieldJournalsRoute);

export default routes;
