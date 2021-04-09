import IRelationsModeratorsDTO from './IRelationsModeratorsDTO';

export default interface IListModeratorsDTO extends IRelationsModeratorsDTO {
    orderBy: 'email' | 'created_at' | 'updated_at';
    orderMethod: 'ASC' | 'DESC';
    page: number;
    limit: number;
}
