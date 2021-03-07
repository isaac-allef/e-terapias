import AppError from '../errors/AppError';
import IFieldJournalTemplate from '../models/IFieldJournalTemplate';
import IFieldJournalTemplateRepository from '../repositories/IFieldJournalTemplateRepository';

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
    constructor(
        private fieldJournalTemplateRepository: IFieldJournalTemplateRepository,
    ) {}

    public async execute({
        name,
        description,
    }: Request): Promise<IFieldJournalTemplate> {
        this.validateDescription(description);

        const fieldJournalTemplate = await this.fieldJournalTemplateRepository.create(
            {
                name,
                description,
            },
        );

        return fieldJournalTemplate;
    }

    private validateDescription(description: Description) {
        const { title, fieldTemplates } = description;

        if (!title) {
            throw new AppError('Property ttitle not found.');
        }

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < fieldTemplates.length; i++) {
            const fieldTemplate = fieldTemplates[i];

            const fieldTemplateLength = Object.keys(fieldTemplate).length;

            if (fieldTemplateLength > 2) {
                throw new AppError(
                    'Each object in fieldTemplates must has two properties only, name and type',
                );
            }

            // eslint-disable-next-line no-prototype-builtins
            const hasPropertyName = fieldTemplate.hasOwnProperty('name');

            if (!hasPropertyName) {
                throw new AppError('Property name not found.');
            }

            // eslint-disable-next-line no-prototype-builtins
            const hasPropertyType = fieldTemplate.hasOwnProperty('type');

            if (!hasPropertyType) {
                throw new AppError('Property type not found.');
            }
        }
    }
}

export default CreateFieldJournalTemplateService;
