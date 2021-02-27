import { Router } from 'express';
import CreateFieldJournalTemplateService from '../services/CreateFieldJournalTemplateService';

const fieldJournalTemplatesRoute = Router();

fieldJournalTemplatesRoute.post('/', async (request, response) => {
    const { name, description } = request.body;

    const fieldJournalTemplateService = new CreateFieldJournalTemplateService();

    const fieldJournalTemplate = await fieldJournalTemplateService.execute({
        name,
        description,
    });

    return response.json(fieldJournalTemplate);
});

fieldJournalTemplatesRoute.get('/', (request, response) => {
    return response.json({ message: 'List' });
});

fieldJournalTemplatesRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

export default fieldJournalTemplatesRoute;
