import Etherapy from '../entities/Etherapy';
import FieldJournal, { field } from '../entities/FieldJournal';
import Moderator from '../entities/Moderator';
import { templateField } from '../entities/Template';
import AppError from '../errors/AppError';
import CreateFieldJournalRepository from '../protocols/db/repositories/CreateFieldJournalRepository';

class CreateFieldJournalService {
    constructor(
        private createFieldJournalRepository: CreateFieldJournalRepository,
    ) {}

    public async execute(
        name: string,
        fields: field[],
        moderator: Moderator,
        etherapy: Etherapy,
    ): Promise<FieldJournal> {
        if (!moderator.etherapies.find(e => e.id === etherapy.id)) {
            throw new AppError(
                'This moderator is not related to this etherapy.',
            );
        }

        if (!etherapy.template) {
            throw new AppError('This therapy does not have a template.');
        }

        const { templateFields } = etherapy.template;

        if (!this.matchFieldsWithtemplateFields(templateFields, fields)) {
            throw new AppError("This field journal doesn't match the template");
        }

        const fieldJournal = await this.createFieldJournalRepository.create(
            name,
            fields,
            moderator,
            etherapy,
        );

        return fieldJournal;
    }

    private matchFieldsWithtemplateFields(
        templateFields: templateField[],
        fields: field[],
    ): boolean {
        const countTemplateFeilds = templateFields.length;
        const countFields = fields.length;

        if (countTemplateFeilds !== countFields) {
            return false;
        }

        // eslint-disable-next-line
        for (let i = 0; i < countTemplateFeilds; i++) {
            if (templateFields[i].name !== fields[i].name) {
                return false;
            }
        }

        return true;
    }
}

export default CreateFieldJournalService;
