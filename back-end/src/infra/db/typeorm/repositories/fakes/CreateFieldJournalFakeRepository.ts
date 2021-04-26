import FieldJournal from '../../../../../core/entities/FieldJournal';
import CreateFieldJournalRepository from '../../../../../core/protocols/db/repositories/CreateFieldJournalRepository';
import FieldJournalFake from '../../entities/Fakes/FieldJournalFake';

class CreateFieldJournalFakeRepository implements CreateFieldJournalRepository {
    async create(name: string, fields: JSON): Promise<FieldJournal> {
        const fieldJournal = new FieldJournalFake(name, fields);

        return fieldJournal;
    }
}

export default CreateFieldJournalFakeRepository;
