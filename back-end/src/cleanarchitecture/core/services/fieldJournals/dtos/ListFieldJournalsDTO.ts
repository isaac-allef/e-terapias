import RelationsFieldJournalDTO from './RelationsFieldJournalDTO';

export default interface ListFieldJournalsDTO extends RelationsFieldJournalDTO {
    orderBy: 'title' | 'created_at' | 'updated_at';
    orderMethod: 'ASC' | 'DESC';
    page: number;
    limit: number;
    search: string;
}
