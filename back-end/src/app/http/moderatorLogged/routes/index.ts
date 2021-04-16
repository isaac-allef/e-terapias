import { Router } from 'express';
import moderatorsRoute from './moderators.routes';
import moderatorsEterapiasRoute from './moderatorsEterapias.routes';
import moderatorsFieldJournalsRoute from './moderatorsFieldJournals.routes';

const moderatorLoggedRoute = Router();

moderatorLoggedRoute.use('/fieldJournals', moderatorsFieldJournalsRoute);
moderatorLoggedRoute.use('/eterapias', moderatorsEterapiasRoute);
moderatorLoggedRoute.use('/', moderatorsRoute);

export default moderatorLoggedRoute;
