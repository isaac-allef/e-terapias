import ICreateModeratorDTO from '../dtos/ICreateModeratorDTO';
import IFindByEmailModeratorDTO from '../dtos/IFindByEmailModeratorDTO';
import IFindByIdModeratorDTO from '../dtos/IFindByIdModeratorDTO';
import IListModeratorsDTO from '../dtos/IListModeratorsDTO';
import IModerator from '../models/IModerator';

export default interface IModeratorRepository {
    create(data: ICreateModeratorDTO): Promise<IModerator>;
    findByEmail(
        data: IFindByEmailModeratorDTO,
    ): Promise<IModerator | undefined>;
    findById(data: IFindByIdModeratorDTO): Promise<IModerator | undefined>;
    all(data: IListModeratorsDTO): Promise<IModerator[] | []>;
    save(moderator: IModerator): Promise<void>;
    delete(moderator: IModerator): Promise<void>;
}
