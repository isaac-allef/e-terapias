import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateFieldJournalContoller from '../../factories/controllers/userModerator/makeCreateFieldJournalContoller';
import makeLoadFieldJournalContoller from '../../factories/controllers/shared/makeLoadFieldJournalContoller';
import adapterMiddleware from '../adapters/expressMiddleware';
import { makeAuthModeratorMiddleware } from '../../factories/middlewares/makeAuthModeratorMiddleware';
import makeUpdateFieldJournalContoller from '../../factories/controllers/userModerator/makeUpdateFieldJournalContoller';

const fieldJournalsRouter = Router();

fieldJournalsRouter.post(
    '/',
    adapterMiddleware(makeAuthModeratorMiddleware()),
    adapterRouter(makeCreateFieldJournalContoller()),
);
fieldJournalsRouter.get('/:id', adapterRouter(makeLoadFieldJournalContoller()));
fieldJournalsRouter.put(
    '/:id',
    adapterMiddleware(makeAuthModeratorMiddleware()),
    adapterRouter(makeUpdateFieldJournalContoller()),
);

export default fieldJournalsRouter;
