import RelationsModeratorsDTO from './RelationsModeratorsDTO';

export default interface CreateModeratorDTO extends RelationsModeratorsDTO {
    email: string;
    password: string;
}
