import { Router } from 'express';
import eterapiasSheetInformationRoute from './eterapiasSheetInformation.routes';
import moderatorsSheetInformationRoute from './moderatorsSheetInformation.routes';
import participantsSheetInformationRoute from './participantsSheetInformation.routes';

const spreadsheetsRoute = Router();

spreadsheetsRoute.use('/eterapias', eterapiasSheetInformationRoute);
spreadsheetsRoute.use('/moderators', moderatorsSheetInformationRoute);
spreadsheetsRoute.use('/participants', participantsSheetInformationRoute);

export default spreadsheetsRoute;
