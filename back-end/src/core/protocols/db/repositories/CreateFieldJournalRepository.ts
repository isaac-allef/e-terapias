import FieldJournal from '../../../entities/FieldJournal';

export default interface CreateFieldJournalRepository {
    create(name: string, fields: JSON): Promise<FieldJournal>;
}
