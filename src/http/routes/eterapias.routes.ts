import { Router } from 'express';
import EterapiaController from '../controllers/EterapiaController';

const eterapiasRoute = Router();
const eterapiaController = new EterapiaController();

eterapiasRoute.post('/', eterapiaController.create);

eterapiasRoute.get('/', eterapiaController.list);

eterapiasRoute.put('/:id', eterapiaController.update);

eterapiasRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

export default eterapiasRoute;
