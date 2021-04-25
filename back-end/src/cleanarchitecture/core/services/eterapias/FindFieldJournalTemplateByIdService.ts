import AppError from '../../errors/AppError';
import FieldJournalTemplate from '../../entities/FieldJournalTemplate';
import FieldJournalTemplateRepository from '../../protocols/db/repositories/FieldJournalTemplateRepository';

interface Request {
    fieldJournalTemplateId: string;
}

class FindFieldJournalTemplateByIdService {
    constructor(
        private fieldJournalTemplateRepository: FieldJournalTemplateRepository,
    ) {}

    public async execute({
        fieldJournalTemplateId,
    }: Request): Promise<FieldJournalTemplate> {
        const fieldJournalTemplate = await this.fieldJournalTemplateRepository.findById(
            {
                id: fieldJournalTemplateId,
            },
        );

        if (!fieldJournalTemplate) {
            throw new AppError('Field journal template not found.');
        }

        return fieldJournalTemplate;
    }
}

export default FindFieldJournalTemplateByIdService;
