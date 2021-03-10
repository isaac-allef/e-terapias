import ICreateModeratorDTO from '../dtos/ICreateModeratorDTO';
import IModerator from '../models/IModerator';

export default interface IModeratorRepository {
    create(data: ICreateModeratorDTO): Promise<IModerator>;
    findByEmail(email: string): Promise<IModerator | undefined>;
    findById(id: string): Promise<IModerator | undefined>;
    all(): Promise<IModerator[] | []>;
    save(moderator: IModerator): Promise<void>;
    delete(moderator: IModerator): Promise<void>;
}
