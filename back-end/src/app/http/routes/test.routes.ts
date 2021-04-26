import { Router, Request, Response } from 'express';
import makeCreateEtherapyService from '../../factories/makeCreateEtherapyService';
import makeCreateModeratorService from '../../factories/makeCreateModeratorService';

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

    const moderatorName = 'viver é bom';
    const moderator = await makeCreateModeratorService().execute(moderatorName);

    if (!moderator.id) {
        return response
            .status(500)
            .json({ message: 'moderator id not found.' });
    }

    if (moderator.name !== moderatorName) {
        return response
            .status(500)
            .json({ message: 'incorrect moderatorName.' });
    }

    return response.json({ etherapy, moderator });
});

export default testRouter;
