import AppError from '../../../shared/errors/AppError';
import IFieldJournalTemplate from '../models/IFieldJournalTemplate';
import IFieldJournalTemplateRepository from '../repositories/IFieldJournalTemplateRepository';

interface Request {
    id: string;
}

class DeleteFieldJournalTemplateService {
    constructor(
        private fieldJournalTemplateRepository: IFieldJournalTemplateRepository,
    ) {}

    public async execute({ id }: Request): Promise<IFieldJournalTemplate> {
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
