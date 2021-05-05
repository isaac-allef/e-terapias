import FieldJournal from '../../../entities/FieldJournal';

export default interface LoadFieldJournalByIdRepository {
    load(id: string): Promise<FieldJournal>;
}
