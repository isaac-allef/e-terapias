import FieldJournal from '../../../entities/FieldJournal';

export type params = {
    sort: 'name' | 'created_at' | 'updated_at';
    direction: 'asc' | 'desc';
    per_page: number;
    page: number;
};

export default interface LoadAllFieldJournalsRepository {
    loadAll({
        sort,
        direction,
        per_page,
        page,
    }: params): Promise<FieldJournal[]>;
}
