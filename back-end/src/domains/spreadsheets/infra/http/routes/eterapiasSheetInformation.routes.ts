import { Router } from 'express';
import EterapiasSheetInformationController from '../controllers/EterapiasSheetInformationController';

const eterapiasSheetInformationRoute = Router();
const eterapiasSheetInformationController = new EterapiasSheetInformationController();

eterapiasSheetInformationRoute.post(
    '/',
    eterapiasSheetInformationController.create,
);

export default eterapiasSheetInformationRoute;
