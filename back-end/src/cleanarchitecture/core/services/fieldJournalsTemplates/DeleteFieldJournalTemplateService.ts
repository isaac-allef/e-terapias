import AppError from '../../errors/AppError';
import FieldJournalTemplate from '../../entities/FieldJournalTemplate';
import FieldJournalTemplateRepository from '../../protocols/db/repositories/FieldJournalTemplateRepository';

interface Request {
    id: string;
}

class DeleteFieldJournalTemplateService {
    constructor(
        private fieldJournalTemplateRepository: FieldJournalTemplateRepository,
    ) {}

    public async execute({ id }: Request): Promise<FieldJournalTemplate> {
        const fieldJournalTemplate = await this.fieldJournalTemplateRepository.findById(
            {
                id,
            },
        );

        if (!fieldJournalTemplate) {
            throw new AppError('Field journal template not found.');
        }

        await this.fieldJournalTemplateRepository.delete(fieldJournalTemplate);

        return fieldJournalTemplate;
    }
}

export default DeleteFieldJournalTemplateService;
