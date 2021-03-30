import IRelationsFieldJournal from './IRelationsFieldJournal';

export default interface IListFieldJournals extends IRelationsFieldJournal {
    orderBy: 'title' | 'created_at' | 'updated_at';
    orderMethod: 'ASC' | 'DESC';
    page: number;
    limit: number;
    search: string;
}
