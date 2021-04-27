import { Router, Request, Response } from 'express';

import makeCreateEtherapyService from '../../factories/makeCreateEtherapyService';
import makeCreateFieldJournalService from '../../factories/makeCreateFieldJournalService';
import makeCreateModeratorService from '../../factories/makeCreateModeratorService';
import makeCreateTemplateService from '../../factories/makeCreateTemplateService';

const testRouter = Router();

testRouter.get('/', async (_request: Request, response: Response) => {
    const etherapyName = 'viver é bom';
    const etherapy = await makeCreateEtherapyService().execute(etherapyName);

    const moderatorName = 'Isaac';
    const moderator = await makeCreateModeratorService().execute(moderatorName);

    const templateName = 'Padrão';
    const templateFields = [
        { name: 'Qual o seu nome?' },
        { name: 'Quanto é 2 + 2?' },
        {
            name: 'Informe sua data de nascimento',
        },
        { name: 'Voçê é estudante?' },
    ];
    const template = await makeCreateTemplateService().execute(
        templateName,
        templateFields,
    );

    moderator.etherapies.push(etherapy);
    etherapy.template = template;

    const fieldJournalName = 'Primeiro dia';
    const fields = [
        { name: 'Qual o seu nome?', value: 'Isaac' },
        { name: 'Quanto é 2 + 2?', value: '4' },
        {
            name: 'Informe sua data de nascimento',
            value: "{% now 'iso-8601', '' %}",
        },
        { name: 'Voçê é estudante?', value: 'sim' },
    ];
    const fieldJournal = await makeCreateFieldJournalService().execute(
        fieldJournalName,
        fields,
        moderator,
        etherapy,
    );

    return response.json({ etherapy, moderator, template, fieldJournal });
});

export default testRouter;
