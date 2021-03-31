import AppError from '../../../shared/errors/AppError';
import IRelationsFieldJournalTemplate from '../dtos/IRelationsFieldJournalTemplate';
import IFieldJournalTemplate from '../models/IFieldJournalTemplate';
import IFieldJournalTemplateRepository from '../repositories/IFieldJournalTemplateRepository';

interface Request extends IRelationsFieldJournalTemplate {
    id: string;
}

class ShowFieldJournalTemplateService {
    constructor(
        private fieldJournalTemplateRepository: IFieldJournalTemplateRepository,
    ) {}

    public async execute({
        id,
        relations,
    }: Request): Promise<IFieldJournalTemplate> {
        const fieldJournalTemplate = await this.fieldJournalTemplateRepository.findById(
            {
                id,
                relations,
            },
        );

        if (!fieldJournalTemplate) {
            throw new AppError('Field journal Template not found.');
        }

        return fieldJournalTemplate;
    }
}

export default ShowFieldJournalTemplateService;
