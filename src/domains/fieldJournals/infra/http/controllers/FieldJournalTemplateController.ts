import { Request, Response } from 'express';
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
}

export default FieldJournalTemplateController;
