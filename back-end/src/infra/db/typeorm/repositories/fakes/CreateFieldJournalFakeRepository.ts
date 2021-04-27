import Etherapy from '../../../../../core/entities/Etherapy';
import FieldJournal, { field } from '../../../../../core/entities/FieldJournal';
import Moderator from '../../../../../core/entities/Moderator';
import CreateFieldJournalRepository from '../../../../../core/protocols/db/repositories/CreateFieldJournalRepository';
import FieldJournalFake from '../../entities/Fakes/FieldJournalFake';

class CreateFieldJournalFakeRepository implements CreateFieldJournalRepository {
    async create(
        name: string,
        fields: field[],
        moderator: Moderator,
        etherapy: Etherapy,
    ): Promise<FieldJournal> {
        const fieldJournal = new FieldJournalFake(
            name,
            fields,
            moderator,
            etherapy,
        );

        return fieldJournal;
    }
}

export default CreateFieldJournalFakeRepository;
