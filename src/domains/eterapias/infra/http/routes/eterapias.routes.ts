import { Router } from 'express';
import ensureAuthenticatedAdministrator from '../../../../administrators/infra/http/middlewares/ensureAuthenticatedAdministrator';
import EterapiaController from '../controllers/EterapiaController';

const eterapiasRoute = Router();
const eterapiaController = new EterapiaController();

eterapiasRoute.use(ensureAuthenticatedAdministrator);

eterapiasRoute.post('/', eterapiaController.create);

eterapiasRoute.get('/', eterapiaController.list);

eterapiasRoute.get('/:id', eterapiaController.show);

eterapiasRoute.put('/:id', eterapiaController.update);

eterapiasRoute.delete('/:id', eterapiaController.delete);

export default eterapiasRoute;
