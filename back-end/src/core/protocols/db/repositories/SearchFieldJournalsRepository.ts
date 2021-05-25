import FieldJournal from '../../../entities/FieldJournal';

export type params = {
    keywords: string;
    per_page: number;
    page: number;
};

export default interface SearchFieldJournalsRepository {
    search({ keywords, per_page, page }: params): Promise<FieldJournal[]>;
}
