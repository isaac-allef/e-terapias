import { Router } from 'express';
import CreateModeratorService from '../services/CreateModeratorService';

const moderatorsRoute = Router();

moderatorsRoute.post('/', async (request, response) => {
    const { email, password } = request.body;

    const createModerator = new CreateModeratorService();

    const moderator = await createModerator.execute({
        email,
        password,
    });

    delete moderator.password;

    return response.json(moderator);
});

moderatorsRoute.get('/', (request, response) => {
    return response.json({ message: 'List' });
});

moderatorsRoute.put('/', (request, response) => {
    return response.json({ message: 'Update' });
});

moderatorsRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

moderatorsRoute.get('/:id', (request, response) => {
    const { id } = request.params;
    return response.json({ message: `Show: ${id}` });
});

export default moderatorsRoute;
