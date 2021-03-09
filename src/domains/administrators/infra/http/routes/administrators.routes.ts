import { Router } from 'express';
import AdministratorController from '../controllers/AdministratorController';

const administratorsRoute = Router();
const administratorController = new AdministratorController();

administratorsRoute.post('/', administratorController.create);

administratorsRoute.get('/', administratorController.list);

administratorsRoute.get('/:id', administratorController.show);

administratorsRoute.put('/:id', administratorController.update);

administratorsRoute.delete('/:id', administratorController.delete);

export default administratorsRoute;
