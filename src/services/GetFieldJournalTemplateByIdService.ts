import { Repository } from 'typeorm';
import FieldJournalTemplate from '../entities/FieldJournalTemplate';
import AppError from '../errors/AppError';

interface Request {
    fieldJournalTemplateId: string;
    fieldJournalTemplateRepository: Repository<FieldJournalTemplate>;
}

class GetFieldJournalTemplateByIdService {
    public async execute({
        fieldJournalTemplateId,
        fieldJournalTemplateRepository,
    }: Request): Promise<FieldJournalTemplate> {
        const fieldJournalTemplate = await fieldJournalTemplateRepository.findOne(
            {
                where: { id: fieldJournalTemplateId },
            },
        );

        if (!fieldJournalTemplate) {
            throw new AppError('Template not found.');
        }

        return fieldJournalTemplate;
    }
}

export default GetFieldJournalTemplateByIdService;
