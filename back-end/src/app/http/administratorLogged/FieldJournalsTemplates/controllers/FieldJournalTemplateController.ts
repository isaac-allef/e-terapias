import { Request, Response } from 'express';
import CreateFieldJournalTemplateService from '../../../../../domains/fieldJournalsTemplates/services/CreateFieldJournalTemplateService';
import DeleteFieldJournalTemplateService from '../../../../../domains/fieldJournalsTemplates/services/DeleteFieldJournalTemplateService';
import ShowFieldJournalTemplateService from '../../../../../domains/fieldJournalsTemplates/services/ShowFieldJournalTemplateService';
import FieldJournalTemplateRepository from '../../../../../domains/fieldJournalsTemplates/infra/typeorm/repositories/FieldJournalTemplateRepository';

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
        const { relations, orderBy, orderMethod, page, limit } = request.query;

        const fieldJournalTemplates = await fieldJournalTemplateRepository.all({
            orderBy: orderBy as 'name' | 'created_at' | 'updated_at',
            orderMethod: orderMethod as 'ASC' | 'DESC',
            page: (page as unknown) as number,
            limit: (limit as unknown) as number,
            relations: relations as ['eterapias'],
        });

        return response.json(fieldJournalTemplates);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { relations } = request.query;

        const fieldJournalTemplateRepository = new FieldJournalTemplateRepository();

        const showFieldJournalTemplateService = new ShowFieldJournalTemplateService(
            fieldJournalTemplateRepository,
        );

        const fieldJournalTemplate = await showFieldJournalTemplateService.execute(
            {
                id,
                relations: relations as ['eterapias'],
            },
        );

        return response.json(fieldJournalTemplate);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const fieldJournalTemplateRepository = new FieldJournalTemplateRepository();

        const deleteFieldJournalTemplateService = new DeleteFieldJournalTemplateService(
            fieldJournalTemplateRepository,
        );

        const fieldJournalTemplate = await deleteFieldJournalTemplateService.execute(
            { id },
        );

        return response.json(fieldJournalTemplate);
    }
}

export default FieldJournalTemplateController;
