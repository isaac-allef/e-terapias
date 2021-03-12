import { Router } from 'express';
import AdministratorController from '../controllers/AdministratorController';
import ensureAuthenticatedAdministrator from '../middlewares/ensureAuthenticatedAdministrator';

const administratorsRoute = Router();
const administratorController = new AdministratorController();

administratorsRoute.post('/', administratorController.create);

administratorsRoute.use(ensureAuthenticatedAdministrator);

administratorsRoute.get('/', administratorController.list);

administratorsRoute.get('/:id', administratorController.show);

administratorsRoute.put('/:id', administratorController.update);

administratorsRoute.delete('/:id', administratorController.delete);

export default administratorsRoute;
