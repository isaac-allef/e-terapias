import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateFieldJournalContoller from '../../factories/controllers/makeCreateFieldJournalContoller';
import makeLoadFieldJournalContoller from '../../factories/controllers/makeLoadFieldJournalContoller';
import adapterMiddleware from '../adapters/expressMiddleware';
import { makeAuthModeratorMiddleware } from '../../factories/middlewares/makeAuthModeratorMiddleware';

const fieldJournalsRouter = Router();

fieldJournalsRouter.post(
    '/',
    adapterMiddleware(makeAuthModeratorMiddleware()),
    adapterRouter(makeCreateFieldJournalContoller()),
);
fieldJournalsRouter.get('/:id', adapterRouter(makeLoadFieldJournalContoller()));

export default fieldJournalsRouter;
