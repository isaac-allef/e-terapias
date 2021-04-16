import { Router } from 'express';
import ParticipantsSheetInformationController from '../controllers/ParticipantsSheetInformationController';

const participantsSheetInformationRoute = Router();
const participantsSheetInformationController = new ParticipantsSheetInformationController();

participantsSheetInformationRoute.get(
    '/',
    participantsSheetInformationController.show,
);

participantsSheetInformationRoute.get(
    '/:eterapiaColumnName',
    participantsSheetInformationController.showByEterapia,
);

export default participantsSheetInformationRoute;
