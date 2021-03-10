import { Router } from 'express';
import FieldJournalTemplateController from '../controllers/FieldJournalTemplateController';

const fieldJournalTemplatesRoute = Router();
const fieldJournalTemplateController = new FieldJournalTemplateController();

fieldJournalTemplatesRoute.post('/', fieldJournalTemplateController.create);

fieldJournalTemplatesRoute.get('/', fieldJournalTemplateController.list);

fieldJournalTemplatesRoute.get('/:id', fieldJournalTemplateController.show);

fieldJournalTemplatesRoute.delete(
    '/:id',
    fieldJournalTemplateController.delete,
);

export default fieldJournalTemplatesRoute;
