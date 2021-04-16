import { Router } from 'express';
import administratorsRoute from '../../administratorLogged/administrators/routes/administrators.routes';
import eterapiasRoute from '../../administratorLogged/eterapias/routes/eterapias.routes';
import fieldJournalsRoute from '../../administratorLogged/fieldJournals/routes/fieldJournals.routes';
import fieldJournalTemplatesRoute from '../../administratorLogged/FieldJournalsTemplates/routes/fieldJournalTemplates.routes';
import moderatorsRoute from '../../administratorLogged/moderators/routes/moderators.routes';
import sessionsRouter from './sessions.routes';
import moderatorLoggedRoute from '../../moderatorLogged/routes';
import participantsSheetInformationRoute from '../../../../domains/participantsSheetInformation/infra/http/routes/participantsSheetInformation.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/administrators', administratorsRoute);
routes.use('/eterapias', eterapiasRoute);
routes.use('/fieldjournaltemplates', fieldJournalTemplatesRoute);
routes.use('/fieldjournals', fieldJournalsRoute);
routes.use('/moderators/me', moderatorLoggedRoute);
routes.use('/moderators', moderatorsRoute);
routes.use('/participants', participantsSheetInformationRoute);

export default routes;
