import { Router } from 'express';
import ensureAuthenticatedAdministrator from '../../../../administrators/infra/http/middlewares/ensureAuthenticatedAdministrator';
import FieldJournalTemplateController from '../controllers/FieldJournalTemplateController';

const fieldJournalTemplatesRoute = Router();
const fieldJournalTemplateController = new FieldJournalTemplateController();

fieldJournalTemplatesRoute.use(ensureAuthenticatedAdministrator);

fieldJournalTemplatesRoute.post('/', fieldJournalTemplateController.create);

fieldJournalTemplatesRoute.get('/', fieldJournalTemplateController.list);

fieldJournalTemplatesRoute.get('/:id', fieldJournalTemplateController.show);

fieldJournalTemplatesRoute.delete(
    '/:id',
    fieldJournalTemplateController.delete,
);

export default fieldJournalTemplatesRoute;
