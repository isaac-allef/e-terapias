import IRelationsModeratorsDTO from './IRelationsModeratorsDTO';

export default interface ICreateModeratorDTO extends IRelationsModeratorsDTO {
    email: string;
    password: string;
}
