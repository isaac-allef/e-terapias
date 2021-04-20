import { Router } from 'express';
import ParticipantsSheetInformationController from '../controllers/ParticipantsSheetInformationController';

const participantsSheetInformationRoute = Router();
const participantsSheetInformationController = new ParticipantsSheetInformationController();

participantsSheetInformationRoute.get(
    '/',
    participantsSheetInformationController.list,
);

participantsSheetInformationRoute.get(
    '/:eterapiaColumnName',
    participantsSheetInformationController.listByEterapia,
);

export default participantsSheetInformationRoute;
