import { Router } from 'express';
import FieldJournalController from '../controllers/FieldJournalController';

const fieldJournalController = new FieldJournalController();

const fieldJournalsRoute = Router();

fieldJournalsRoute.post('/', fieldJournalController.create);

fieldJournalsRoute.get('/', fieldJournalController.list);

fieldJournalsRoute.get('/:id', fieldJournalController.show);

fieldJournalsRoute.put('/:id', fieldJournalController.update);

fieldJournalsRoute.delete('/:id', fieldJournalController.delete);

export default fieldJournalsRoute;
