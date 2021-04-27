import Etherapy from '../../../entities/Etherapy';
import FieldJournal, { field } from '../../../entities/FieldJournal';
import Moderator from '../../../entities/Moderator';

export default interface CreateFieldJournalRepository {
    create(
        name: string,
        fields: field[],
        moderator: Moderator,
        etherapy: Etherapy,
    ): Promise<FieldJournal>;
}
