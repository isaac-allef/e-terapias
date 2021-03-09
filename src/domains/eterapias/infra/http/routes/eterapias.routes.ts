import { Router } from 'express';
import EterapiaController from '../controllers/EterapiaController';

const eterapiasRoute = Router();
const eterapiaController = new EterapiaController();

eterapiasRoute.post('/', eterapiaController.create);

eterapiasRoute.get('/', eterapiaController.list);

eterapiasRoute.get('/:id', eterapiaController.show);

eterapiasRoute.put('/:id', eterapiaController.update);

eterapiasRoute.delete('/:id', eterapiaController.delete);

export default eterapiasRoute;
