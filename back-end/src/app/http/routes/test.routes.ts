import { Router, Request, Response } from 'express';

import makeCreateEtherapyService from '../../factories/makeCreateEtherapyService';
import makeCreateFieldJournalService from '../../factories/makeCreateFieldJournalService';
import makeLoadModeratorByIdService from '../../factories/makeLoadModeratorByIdService';
import makeCreateModeratorService from '../../factories/makeCreateModeratorService';
import makeCreateTemplateService from '../../factories/makeCreateTemplateService';
import makeLoadEtherapyByIdService from '../../factories/makeLoadEtherapyByIdService';
import makeLoadTemplateByIdService from '../../factories/makeLoadTemplateByIdService';
import makeLinkTemplateToEtherapiesService from '../../factories/makeLinkTemplateToEtherapiesService';
import makeLinkModeratorToEtherapyService from '../../factories/makeLinkModeratorToEtherapyService';
import makeAuthenticationService from '../../factories/makeAuthenticationService';

const testRouter = Router();

testRouter.get('/', async (_request: Request, response: Response) => {
    const etherapyName = 'viver é bom';
    const etherapy = await makeCreateEtherapyService().execute(etherapyName);

    const moderatorEmail = 'isaac@gmail.com';
    const moderatorName = 'Isaac';
    const moderator = await makeCreateModeratorService().execute(
        moderatorEmail,
        moderatorName,
    );

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
        'oioioioi',
        'eieieiei',
    );

    const moderatorId = 'hahahaha';
    const loadmoderator = await makeLoadModeratorByIdService().execute(
        moderatorId,
    );

    const etherapyId = 'hahahaha';
    const loadetherapy = await makeLoadEtherapyByIdService().execute(
        etherapyId,
    );

    const templateId = 'hahahaha';
    const loadtemplate = await makeLoadTemplateByIdService().execute(
        templateId,
    );

    const linkTemplatesToEtherapies = await makeLinkTemplateToEtherapiesService().execute(
        templateId,
        [etherapyId],
    );

    const linkModeratorToEtherapy = await makeLinkModeratorToEtherapyService().execute(
        moderatorId,
        etherapyId,
    );

    const moderatorUpdatedToken = await makeAuthenticationService().execute(
        'isaac@gmail.com',
        '1234',
    );

    return response.json({
        etherapy,
        moderator,
        template,
        fieldJournal,
        loadmoderator,
        loadetherapy,
        loadtemplate,
        linkTemplatesToEtherapies,
        linkModeratorToEtherapy,
        moderatorUpdatedToken,
    });
});

export default testRouter;
