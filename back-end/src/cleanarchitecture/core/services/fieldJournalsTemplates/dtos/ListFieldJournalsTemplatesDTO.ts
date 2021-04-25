import RelationsFieldJournalTemplateDTO from './RelationsFieldJournalTemplateDTO';

export default interface ListFieldJournalsTemplatesDTO
    extends RelationsFieldJournalTemplateDTO {
    orderBy: 'name' | 'created_at' | 'updated_at';
    orderMethod: 'ASC' | 'DESC';
    page: number;
    limit: number;
    search: string;
}
