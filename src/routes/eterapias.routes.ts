import { Router } from 'express';

const eterapiasRoute = Router();

eterapiasRoute.post('/', (request, response) => {
    return response.json({ message: 'Create' });
});

eterapiasRoute.get('/', (request, response) => {
    return response.json({ message: 'List' });
});

eterapiasRoute.put('/', (request, response) => {
    return response.json({ message: 'Update' });
});

eterapiasRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

export default eterapiasRoute;
