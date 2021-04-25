import AppError from '../../errors/AppError';
import RelationsFieldJournalTemplateDTO from './dtos/RelationsFieldJournalTemplateDTO';
import FieldJournalTemplate from '../../entities/FieldJournalTemplate';
import FieldJournalTemplateRepository from '../../protocols/db/repositories/FieldJournalTemplateRepository';

interface Request extends RelationsFieldJournalTemplateDTO {
    id: string;
}

class ShowFieldJournalTemplateService {
    constructor(
        private fieldJournalTemplateRepository: FieldJournalTemplateRepository,
    ) {}

    public async execute({
        id,
        relations,
    }: Request): Promise<FieldJournalTemplate> {
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
