import Etherapy from '../entities/Etherapy';
import FieldJournal, { field } from '../entities/FieldJournal';
import Moderator from '../entities/Moderator';
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

        const fieldJournal = await this.createFieldJournalRepository.create(
            name,
            fields,
            moderator,
            etherapy,
        );

        return fieldJournal;
    }
}

export default CreateFieldJournalService;
