import { Router, Request, Response } from 'express';
import CreateEtherapyService from '../../../core/services/CreateEtherapyService';
import CreateEtherapyFakeRepository from '../../../infra/db/typeorm/repositories/fakes/CreateEtherapyFakeRepository';

const etherapyRouter = Router();

etherapyRouter.post('/', async (_request: Request, response: Response) => {
    const createEtherapyRepository = new CreateEtherapyFakeRepository();
    const createEtherapy = new CreateEtherapyService(createEtherapyRepository);
    const etherapy = await createEtherapy.execute('viver é bom');
    return response.json({ etherapy });
});

export default etherapyRouter;
