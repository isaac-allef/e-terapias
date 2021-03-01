import { Router } from 'express';
import { getRepository } from 'typeorm';
import Eterapia from '../entities/Eterapia';
import FieldJournalTemplate from '../entities/FieldJournalTemplate';
import GetEterapiaByIdService from '../services/GetEterapiaByIdService';
import GetFieldJournalTemplateByIdService from '../services/GetFieldJournalTemplateByIdService';

const eterapiasRoute = Router();

eterapiasRoute.post('/', async (request, response) => {
    const { name } = request.body;

    const eterapiaRepository = getRepository(Eterapia);

    const eterapia = eterapiaRepository.create({
        name,
    });

    await eterapiaRepository.save(eterapia);

    return response.json(eterapia);
});

eterapiasRoute.get('/', async (request, response) => {
    const eterapiaRepository = getRepository(Eterapia);

    const eterapias = await eterapiaRepository.find();

    return response.json(eterapias);
});

eterapiasRoute.put('/:id', async (request, response) => {
    const { id } = request.params;

    const { name, fieldJournalTemplateId } = request.body;

    const eterapiaRepository = getRepository(Eterapia);

    const getEterapiaById = new GetEterapiaByIdService();
    const eterapia = await getEterapiaById.execute({
        eterapiaId: id,
        eterapiaRepository,
    });

    eterapia.name = name;

    const fieldJournalTemplateRepository = getRepository(FieldJournalTemplate);

    const getFieldJournalTemplateById = new GetFieldJournalTemplateByIdService();
    const fieldJournalTemplate = await getFieldJournalTemplateById.execute({
        fieldJournalTemplateId,
        fieldJournalTemplateRepository,
    });

    eterapia.fieldJournalTemplate = fieldJournalTemplate;

    eterapiaRepository.save(eterapia);

    return response.json(eterapia);
});

eterapiasRoute.delete('/', (request, response) => {
    return response.json({ message: 'Delete' });
});

export default eterapiasRoute;
