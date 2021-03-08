import { Router } from 'express';
import AdministratorController from '../controllers/AdministratorController';

const administratorsRoute = Router();
const administratorController = new AdministratorController();

administratorsRoute.post('/', administratorController.create);

administratorsRoute.get('/', (request, response) => {
    return response.json({ message: 'List' });
});

administratorsRoute.put('/', (request, response) => {
    return response.json({ message: 'Update' });
});

administratorsRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

administratorsRoute.get('/:id', (request, response) => {
    const { id } = request.params;
    return response.json({ message: `Show: ${id}` });
});

export default administratorsRoute;
