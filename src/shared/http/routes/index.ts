import { Router } from 'express';
import administratorsRoute from '../../../domains/administrators/infra/http/routes/administrators.routes';
import eterapiasRoute from '../../../domains/eterapias/infra/http/routes/eterapias.routes';
import fieldJournalsRoute from '../../../domains/fieldJournals/infra/http/routes/fieldJournals.routes';
import fieldJournalTemplatesRoute from '../../../domains/fieldJournals/infra/http/routes/fieldJournalTemplates.routes';
import moderatorsRoute from '../../../domains/moderators/infra/http/routes/moderators.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/administrators', administratorsRoute);
routes.use('/eterapias', eterapiasRoute);
routes.use('/fieldjournaltemplates', fieldJournalTemplatesRoute);
routes.use('/moderators', moderatorsRoute);
routes.use('/fieldjournals', fieldJournalsRoute);

export default routes;
