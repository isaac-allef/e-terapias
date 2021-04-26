import { Router, Request, Response } from 'express';

import makeCreateEtherapyService from '../../factories/makeCreateEtherapyService';

const testRouter = Router();

testRouter.get('/', async (_request: Request, response: Response) => {
    const etherapyName = 'viver é bom';
    const etherapy = await makeCreateEtherapyService().execute(etherapyName);

    if (!etherapy.id) {
        return response.status(500).json({ message: 'etherapy id not found.' });
    }

    if (etherapy.name !== etherapyName) {
        return response
            .status(500)
            .json({ message: 'incorrect etherapyName.' });
    }

    return response.json({ etherapy });
});

export default testRouter;
