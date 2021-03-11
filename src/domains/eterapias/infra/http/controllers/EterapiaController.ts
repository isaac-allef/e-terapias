import { Request, Response } from 'express';
import AppError from '../../../../../shared/errors/AppError';
import FieldJournalTemplateRepository from '../../../../fieldJournals/infra/typeorm/repositories/FieldJournalTemplateRepository';
import EterapiaRepository from '../../typeorm/repositories/EterapiaRepository';

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
        const { search, orderBy, orderMethod, page, limit } = request.query;

        const eterapias = await eterapiaRepository.all(
            orderBy as 'name' | 'created_at' | 'updated_at',
            orderMethod as 'ASC' | 'DESC',
            (page as unknown) as number,
            (limit as unknown) as number,
            search as string,
        );
        return response.json(eterapias);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const eterapiaRepository = new EterapiaRepository();

        const eterapia = await eterapiaRepository.findById(id);

        return response.json(eterapia);
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

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const eterapiaRepository = new EterapiaRepository();

        const eterapia = await eterapiaRepository.findById(id);

        if (!eterapia) {
            throw new AppError('Eterapia not found.');
        }

        await eterapiaRepository.delete(eterapia);

        return response.json(eterapia);
    }
}

export default EterapiaController;
