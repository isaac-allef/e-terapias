import FieldJournal from '../../../entities/FieldJournal';

export default interface SearchFieldJournalsRepository {
    search(keywords: string): Promise<FieldJournal[]>;
}
