import { Router } from 'express';
import ModeratorController from '../controllers/ModeratorController';

const moderatorsRoute = Router();
const moderatorController = new ModeratorController();

moderatorsRoute.post('/', moderatorController.create);

moderatorsRoute.get('/', (request, response) => {
    return response.json({ message: 'List' });
});

moderatorsRoute.put('/:id', moderatorController.update);

moderatorsRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

moderatorsRoute.get('/:id', (request, response) => {
    const { id } = request.params;
    return response.json({ message: `Show: ${id}` });
});

export default moderatorsRoute;
