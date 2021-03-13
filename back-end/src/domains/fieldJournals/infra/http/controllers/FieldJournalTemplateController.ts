import { Request, Response } from 'express';
import AppError from '../../../../../shared/errors/AppError';
import CreateFieldJournalTemplateService from '../../../services/CreateFieldJournalTemplateService';
import FieldJournalTemplateRepository from '../../typeorm/repositories/FieldJournalTemplateRepository';

class FieldJournalTemplateController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, description } = request.body;

        const fieldJournalTemplateRepository = new FieldJournalTemplateRepository();

        const fieldJournalTemplateService = new CreateFieldJournalTemplateService(
            fieldJournalTemplateRepository,
        );

        const fieldJournalTemplate = await fieldJournalTemplateService.execute({
            name,
            description,
        });

        return response.json(fieldJournalTemplate);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const fieldJournalTemplateRepository = new FieldJournalTemplateRepository();
        const {
            search,
            relations,
            orderBy,
            orderMethod,
            page,
            limit,
        } = request.query;

        const fieldJournalTemplates = await fieldJournalTemplateRepository.all(
            orderBy as 'name' | 'created_at' | 'updated_at',
            orderMethod as 'ASC' | 'DESC',
            (page as unknown) as number,
            (limit as unknown) as number,
            search as string,
            relations as ['eterapias'],
        );

        return response.json(fieldJournalTemplates);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { relations } = request.query;

        const fieldJournalTemplateRepository = new FieldJournalTemplateRepository();

        const fieldJournalTemplate = await fieldJournalTemplateRepository.findById(
            id,
            relations as ['eterapias'],
        );

        if (!fieldJournalTemplate) {
            throw new AppError('Field journal template not found.');
        }

        return response.json(fieldJournalTemplate);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const fieldJournalTemplateRepository = new FieldJournalTemplateRepository();

        const fieldJournalTemplate = await fieldJournalTemplateRepository.findById(
            id,
        );

        if (!fieldJournalTemplate) {
            throw new AppError('Field journal template not found.');
        }

        await fieldJournalTemplateRepository.delete(fieldJournalTemplate);

        return response.json(fieldJournalTemplate);
    }
}

export default FieldJournalTemplateController;
