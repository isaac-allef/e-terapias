import { Router } from 'express';
import FieldJournalTemplateController from '../controllers/FieldJournalTemplateController';

const fieldJournalTemplatesRoute = Router();
const fieldJournalTemplateController = new FieldJournalTemplateController();

fieldJournalTemplatesRoute.post('/', fieldJournalTemplateController.create);

fieldJournalTemplatesRoute.get('/', (request, response) => {
    return response.json({ message: 'List' });
});

fieldJournalTemplatesRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

export default fieldJournalTemplatesRoute;
