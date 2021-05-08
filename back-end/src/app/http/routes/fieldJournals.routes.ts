import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateFieldJournalContoller from '../../factories/controllers/makeCreateFieldJournalContoller';
import makeLoadFieldJournalContoller from '../../factories/controllers/makeLoadFieldJournalContoller';

const fieldJournalsRouter = Router();

fieldJournalsRouter.post('/', adapterRouter(makeCreateFieldJournalContoller()));
fieldJournalsRouter.get('/:id', adapterRouter(makeLoadFieldJournalContoller()));

export default fieldJournalsRouter;
