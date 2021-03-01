import { getRepository } from 'typeorm';
import FieldJournalTemplate from '../entities/FieldJournalTemplate';

interface FieldTemplates {
    name: string;
    type: string;
}

interface Description {
    title: string;
    fieldTemplates: FieldTemplates[];
}

interface Request {
    name: string;
    description: Description;
}

class CreateFieldJournalTemplateService {
    public async execute({
        name,
        description,
    }: Request): Promise<FieldJournalTemplate> {
        const fieldJournalTemplateRepository = getRepository(
            FieldJournalTemplate,
        );

        const fieldJournalTemplate = fieldJournalTemplateRepository.create({
            name,
            description,
        });

        await fieldJournalTemplateRepository.save(fieldJournalTemplate);

        return fieldJournalTemplate;
    }
}

export default CreateFieldJournalTemplateService;
