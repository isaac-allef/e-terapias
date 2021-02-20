import { Router } from 'express';

const moderatorsRoute = Router();

moderatorsRoute.post('/', (request, response) => {
    return response.json({ message: 'Create' });
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
