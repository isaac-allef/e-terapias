import { Router } from 'express';

const fieldJournalTemplatesRoute = Router();

fieldJournalTemplatesRoute.post('/', (request, response) => {
    return response.json({ message: 'Create' });
});

fieldJournalTemplatesRoute.get('/', (request, response) => {
    return response.json({ message: 'List' });
});

fieldJournalTemplatesRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

export default fieldJournalTemplatesRoute;
