import ICreateModeratorDTO from '../dtos/ICreateModeratorDTO';
import Moderator from '../typeorm/entities/Moderator';

export default interface IModeratorRepository {
    create(data: ICreateModeratorDTO): Promise<Moderator>;
    findByEmail(email: string): Promise<Moderator | undefined>;
    findById(id: string): Promise<Moderator | undefined>;
    save(moderator: Moderator): Promise<void>;
}
