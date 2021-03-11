import ICreateModeratorDTO from '../dtos/ICreateModeratorDTO';
import IModerator from '../models/IModerator';

export default interface IModeratorRepository {
    create(data: ICreateModeratorDTO): Promise<IModerator>;
    findByEmail(email: string): Promise<IModerator | undefined>;
    findById(id: string): Promise<IModerator | undefined>;
    all(
        orderBy: 'email' | 'created_at' | 'updated_at',
        orderMethod: 'ASC' | 'DESC',
        page: number,
        limit: number,
        search: string,
    ): Promise<IModerator[] | []>;
    save(moderator: IModerator): Promise<void>;
    delete(moderator: IModerator): Promise<void>;
}
