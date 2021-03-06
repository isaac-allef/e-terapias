import { Router } from 'express';
import { getRepository } from 'typeorm';
import FieldJournal from '../../typeorm/entities/FieldJournal';
import CreateFieldJournalService from '../../services/CreateFieldJournalService';

const fieldJournalsRoute = Router();

fieldJournalsRoute.post('/', async (request, response) => {
    const { title, fields, eterapiaId, moderatorId } = request.body;

    const createFieldJournal = new CreateFieldJournalService();

    const fieldJournal = await createFieldJournal.execute({
        title,
        fields,
        eterapiaId,
        moderatorId,
    });

    return response.json(fieldJournal);
});

fieldJournalsRoute.get('/', async (request, response) => {
    const fieldJournalRepository = getRepository(FieldJournal);

    const fieldJournals = await fieldJournalRepository.find();

    return response.json(fieldJournals);
});

fieldJournalsRoute.put('/', (request, response) => {
    return response.json({ message: 'Update' });
});

fieldJournalsRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

export default fieldJournalsRoute;
