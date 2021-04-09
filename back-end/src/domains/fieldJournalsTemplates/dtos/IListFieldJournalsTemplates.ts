import IRelationsFieldJournalTemplate from './IRelationsFieldJournalTemplate';

export default interface IListFieldJournalsTemplates
    extends IRelationsFieldJournalTemplate {
    orderBy: 'name' | 'created_at' | 'updated_at';
    orderMethod: 'ASC' | 'DESC';
    page: number;
    limit: number;
}
