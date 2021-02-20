import { Router } from 'express';

const fieldJournalsRoute = Router();

fieldJournalsRoute.post('/', (request, response) => {
    return response.json({ message: 'Create' });
});

fieldJournalsRoute.get('/', (request, response) => {
    return response.json({ message: 'List' });
});

fieldJournalsRoute.put('/', (request, response) => {
    return response.json({ message: 'Update' });
});

fieldJournalsRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

export default fieldJournalsRoute;
