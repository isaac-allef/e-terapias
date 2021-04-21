import { Router } from 'express';
import ModeratorsSheetInformationController from '../controllers/ModeratorsSheetInformationController';

const moderatorsSheetInformationRoute = Router();
const moderatorsSheetInformationController = new ModeratorsSheetInformationController();

moderatorsSheetInformationRoute.get(
    '/',
    moderatorsSheetInformationController.list,
);

moderatorsSheetInformationRoute.post(
    '/',
    moderatorsSheetInformationController.create,
);

export default moderatorsSheetInformationRoute;
