import { Router } from 'express';
import moderatorsSheetInformationRoute from './moderatorsSheetInformation.routes';
import participantsSheetInformationRoute from './participantsSheetInformation.routes';

const spreadsheetsRoute = Router();

spreadsheetsRoute.use('/moderators', moderatorsSheetInformationRoute);
spreadsheetsRoute.use('/participants', participantsSheetInformationRoute);

export default spreadsheetsRoute;
