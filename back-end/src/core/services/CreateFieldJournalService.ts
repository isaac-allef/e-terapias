import FieldJournal from '../entities/FieldJournal';
import CreateFieldJournalRepository from '../protocols/db/repositories/CreateFieldJournalRepository';

class CreateFieldJournalService {
    constructor(
        private createFieldJournalRepository: CreateFieldJournalRepository,
    ) {}

    public async execute(name: string, fields: JSON): Promise<FieldJournal> {
        const fieldJournal = await this.createFieldJournalRepository.create(
            name,
            fields,
        );

        return fieldJournal;
    }
}

export default CreateFieldJournalService;
