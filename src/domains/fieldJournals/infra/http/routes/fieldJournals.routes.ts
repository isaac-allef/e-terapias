import { Router } from 'express';
import ensureAuthenticatedAdministrator from '../../../../administrators/infra/http/middlewares/ensureAuthenticatedAdministrator';
import ensureAuthenticatedModerator from '../../../../moderators/infra/http/middlewares/ensureAuthenticatedModerator';
import FieldJournalAdministratorController from '../controllers/FieldJournalAdministratorController';
import FieldJournalModeratorController from '../controllers/FieldJournalModeratorController';

const fieldJournalAdministratorController = new FieldJournalAdministratorController();
const fieldJournalModeratorController = new FieldJournalModeratorController();

const fieldJournalsRoute = Router();

fieldJournalsRoute.use('*/administrator', ensureAuthenticatedAdministrator);
fieldJournalsRoute.use('*/moderator', ensureAuthenticatedModerator);

fieldJournalsRoute.get(
    '/administrator',
    fieldJournalAdministratorController.list,
);

fieldJournalsRoute.get(
    '/:id/administrator',
    fieldJournalAdministratorController.show,
);

fieldJournalsRoute.delete(
    '/:id/administrator',
    fieldJournalAdministratorController.delete,
);

///

fieldJournalsRoute.post('/moderator', fieldJournalModeratorController.create);

fieldJournalsRoute.get('/moderator', fieldJournalModeratorController.list);

fieldJournalsRoute.get('/:id/moderator', fieldJournalModeratorController.show);

fieldJournalsRoute.put(
    '/:id/moderator',
    fieldJournalModeratorController.update,
);

fieldJournalsRoute.delete(
    '/:id/moderator',
    fieldJournalModeratorController.delete,
);

export default fieldJournalsRoute;
