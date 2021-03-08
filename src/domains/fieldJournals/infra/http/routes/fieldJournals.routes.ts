import { Router } from 'express';
import FieldJournalController from '../controllers/FieldJournalController';

const fieldJournalController = new FieldJournalController();

const fieldJournalsRoute = Router();

fieldJournalsRoute.post('/', fieldJournalController.create);

fieldJournalsRoute.get('/', fieldJournalController.list);

fieldJournalsRoute.put('/', (request, response) => {
    return response.json({ message: 'Update' });
});

fieldJournalsRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

export default fieldJournalsRoute;
