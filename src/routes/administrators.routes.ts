import { Router } from 'express';
import CreateAdministratorService from '../services/CreateAdministratorService';

const administratorsRoute = Router();

administratorsRoute.post('/', async (request, response) => {
    const { email, password } = request.body;

    const createAdministrator = new CreateAdministratorService();

    const administrator = await createAdministrator.execute({
        email,
        password,
    });
    return response.json(administrator);
});

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
