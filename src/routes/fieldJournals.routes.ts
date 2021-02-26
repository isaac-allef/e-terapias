import { Router } from 'express';
import CreateFieldJournalService from '../services/CreateFieldJournalService';

const fieldJournalsRoute = Router();

fieldJournalsRoute.post('/', async (request, response) => {
    const { title, fields } = request.body;

    const createFieldJournal = new CreateFieldJournalService();

    const fieldJournal = await createFieldJournal.execute({
        title,
        fields,
    });

    return response.json(fieldJournal);
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
