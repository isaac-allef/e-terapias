import { Router, Request, Response } from 'express';

import makeCreateEtherapyService from '../../factories/makeCreateEtherapyService';
import makeCreateFieldJournalService from '../../factories/makeCreateFieldJournalService';
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

    const moderatorName = 'Isaac';
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

    const fieldJournalName = 'Primeiro dia';
    const fields = [
        { name: 'Qual o seu nome?', value: 'Isaac' },
        { name: 'Quanto é 2 + 2?', value: '4' },
        {
            name: 'Informe sua data de nascimento',
            value: "{% now 'iso-8601', '' %}",
        },
        { name: 'Voçê é estudante?', value: true },
    ];
    const fieldJournal = await makeCreateFieldJournalService().execute(
        fieldJournalName,
        JSON.parse(JSON.stringify(fields)),
    );

    if (!fieldJournal.id) {
        return response
            .status(500)
            .json({ message: 'fieldJournal id not found.' });
    }

    if (fieldJournal.name !== fieldJournalName) {
        return response
            .status(500)
            .json({ message: 'incorrect fieldJournalName.' });
    }

    return response.json({ etherapy, moderator, fieldJournal });
});

export default testRouter;
