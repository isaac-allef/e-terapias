import IRelationsModeratorsDTO from './IRelationsModeratorsDTO';

export default interface IFindByEmailModeratorDTO
    extends IRelationsModeratorsDTO {
    email: string;
}
