import { getRepository } from 'typeorm';
import FieldJournalModel from '../entities/FieldJournalModel';

interface FieldModels {
    name: string;
    type: string;
}

interface Description {
    title: string;
    fieldModels: FieldModels[];
}

interface Request {
    name: string;
    description: Description;
}

class CreateFieldJournalTemplateService {
    public async execute({
        name,
        description,
    }: Request): Promise<FieldJournalModel> {
        const fieldJournalTemplateRepository = getRepository(FieldJournalModel);

        const fieldJournalTemplate = fieldJournalTemplateRepository.create({
            name,
            description,
        });

        await fieldJournalTemplateRepository.save(fieldJournalTemplate);

        return fieldJournalTemplate;
    }
}

export default CreateFieldJournalTemplateService;
