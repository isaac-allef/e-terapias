import FieldJournal, { field } from '../../../entities/FieldJournal';

export default interface CreateFieldJournalRepository {
    create(name: string, fields: field[]): Promise<FieldJournal>;
}
