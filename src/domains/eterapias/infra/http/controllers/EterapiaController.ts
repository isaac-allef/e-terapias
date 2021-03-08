import { Request, Response } from 'express';
import AppError from '../../../../../shared/errors/AppError';
import EterapiaRepository from '../../typeorm/repositories/EterapiaRepository';
import FieldJournalTemplateRepository from '../../../../../typeorm/repositories/FieldJournalTemplateRepository';

class EterapiaController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name } = request.body;

        const eterapiaRepository = new EterapiaRepository();

        const eterapia = await eterapiaRepository.create({
            name,
        });

        return response.json(eterapia);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const eterapiaRepository = new EterapiaRepository();

        const eterapias = await eterapiaRepository.all();

        return response.json(eterapias);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const { name, fieldJournalTemplateId } = request.body;

        const eterapiaRepository = new EterapiaRepository();

        const eterapia = await eterapiaRepository.findById(id);

        if (!eterapia) {
            throw new AppError('Eterapia not found.');
        }

        eterapia.name = name;

        const fieldJournalTemplateRepository = new FieldJournalTemplateRepository();

        const fieldJournalTemplate = await fieldJournalTemplateRepository.findById(
            fieldJournalTemplateId,
        );

        if (!fieldJournalTemplate) {
            throw new AppError('Field journal template not found.');
        }

        eterapia.fieldJournalTemplate = fieldJournalTemplate;

        eterapiaRepository.save(eterapia);

        return response.json(eterapia);
    }
}

export default EterapiaController;
