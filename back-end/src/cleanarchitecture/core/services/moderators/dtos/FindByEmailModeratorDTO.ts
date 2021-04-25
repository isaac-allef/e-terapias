import RelationsModeratorsDTO from './RelationsModeratorsDTO';

export default interface FindByEmailModeratorDTO
    extends RelationsModeratorsDTO {
    email: string;
}
