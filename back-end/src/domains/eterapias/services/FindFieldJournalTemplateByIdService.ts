import AppError from '../../../shared/errors/AppError';
import IFieldJournalTemplate from '../../fieldJournalsTemplates/models/IFieldJournalTemplate';
import IFieldJournalTemplateRepository from '../../fieldJournalsTemplates/repositories/IFieldJournalTemplateRepository';

interface Request {
    fieldJournalTemplateId: string;
}

class FindFieldJournalTemplateByIdService {
    constructor(
        private fieldJournalTemplateRepository: IFieldJournalTemplateRepository,
    ) {}

    public async execute({
        fieldJournalTemplateId,
    }: Request): Promise<IFieldJournalTemplate> {
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
