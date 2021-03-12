import { Router } from 'express';
import ensureAuthenticatedAdministrator from '../../../../administrators/infra/http/middlewares/ensureAuthenticatedAdministrator';
import ensureAuthenticatedModerator from '../../../../moderators/infra/http/middlewares/ensureAuthenticatedModerator';
import FieldJournalAdministratorController from '../controllers/FieldJournalAdministratorController';
import FieldJournalModeratorController from '../controllers/FieldJournalModeratorController';

const fieldJournalAdministratorController = new FieldJournalAdministratorController();
const fieldJournalModeratorController = new FieldJournalModeratorController();

const fieldJournalsRoute = Router();

fieldJournalsRoute.get(
    '/administrator',
    ensureAuthenticatedAdministrator,
    fieldJournalAdministratorController.list,
);

fieldJournalsRoute.get(
    '/:id/administrator',
    ensureAuthenticatedAdministrator,
    fieldJournalAdministratorController.show,
);

fieldJournalsRoute.delete(
    '/:id/administrator',
    ensureAuthenticatedAdministrator,
    fieldJournalAdministratorController.delete,
);

///

fieldJournalsRoute.post(
    '/moderator',
    ensureAuthenticatedModerator,
    fieldJournalModeratorController.create,
);

fieldJournalsRoute.get(
    '/moderator',
    ensureAuthenticatedModerator,
    fieldJournalModeratorController.list,
);

fieldJournalsRoute.get(
    '/:id/moderator',
    ensureAuthenticatedModerator,
    fieldJournalModeratorController.show,
);

fieldJournalsRoute.put(
    '/:id/moderator',
    ensureAuthenticatedModerator,
    fieldJournalModeratorController.update,
);

fieldJournalsRoute.delete(
    '/:id/moderator',
    ensureAuthenticatedModerator,
    fieldJournalModeratorController.delete,
);

export default fieldJournalsRoute;
