import { Router } from 'express';
import adapterRouter from '../adapters/expressRouter';
import makeCreateFieldJournalContoller from '../../factories/makeCreateFieldJournalContoller';

const fieldJournalsRouter = Router();

fieldJournalsRouter.post('/', adapterRouter(makeCreateFieldJournalContoller()));

export default fieldJournalsRouter;
