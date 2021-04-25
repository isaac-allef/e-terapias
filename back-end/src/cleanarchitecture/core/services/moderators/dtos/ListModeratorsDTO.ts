import RelationsModeratorsDTO from './RelationsModeratorsDTO';

export default interface ListModeratorsDTO extends RelationsModeratorsDTO {
    orderBy: 'email' | 'created_at' | 'updated_at';
    orderMethod: 'ASC' | 'DESC';
    page: number;
    limit: number;
    search: string;
}
