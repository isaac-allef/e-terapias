import { EntityRepository, getRepository, ILike, Repository } from 'typeorm';
import ICreateAdministratorDTO from '../../../../administrators/dtos/ICreateAdministratorDTO';
import IFindByEmailModeratorDTO from '../../../dtos/IFindByEmailModeratorDTO';
import IFindByIdModeratorDTO from '../../../dtos/IFindByIdModeratorDTO';
import IListModeratorsDTO from '../../../dtos/IListModeratorsDTO';
import IModeratorRepository from '../../../repositories/IModeratorRepository';
import Moderator from '../entities/Moderator';

@EntityRepository()
class ModeratorRepository implements IModeratorRepository {
    private ormRepository: Repository<Moderator>;

    constructor() {
        this.ormRepository = getRepository(Moderator);
    }

    public async create({
        email,
        password,
    }: ICreateAdministratorDTO): Promise<Moderator> {
        const moderator = this.ormRepository.create({
            email,
            password,
        });

        await this.ormRepository.save(moderator);

        return moderator;
    }

    public async findByEmail({
        email,
        relations,
    }: IFindByEmailModeratorDTO): Promise<Moderator | undefined> {
        const moderator = await this.ormRepository.findOne({
            where: { email },
            relations,
        });

        return moderator;
    }

    public async findById({
        id,
        relations,
    }: IFindByIdModeratorDTO): Promise<Moderator | undefined> {
        const moderator = await this.ormRepository.findOne({
            where: { id },
            relations,
        });

        return moderator;
    }

    public async all({
        orderBy,
        orderMethod,
        page = 1,
        limit = 5,
        search = '',
        relations,
    }: IListModeratorsDTO): Promise<Moderator[] | []> {
        const orderObject = this.createOrderObject(orderBy, orderMethod);

        const moderators = await this.ormRepository.find({
            order: orderObject,
            take: limit,
            skip: (page - 1) * limit,
            where: [{ email: ILike(`%${search}%`) }],
            relations,
        });

        return moderators;
    }

    private createOrderObject(
        orderBy: 'email' | 'created_at' | 'updated_at',
        orderMethod: 'ASC' | 'DESC',
    ) {
        if (orderBy === 'email') {
            return { email: orderMethod };
        }
        if (orderBy === 'created_at') {
            return { created_at: orderMethod };
        }
        if (orderBy === 'updated_at') {
            return { created_at: orderMethod };
        }
        return undefined;
    }

    public async save(moderator: Moderator): Promise<void> {
        await this.ormRepository.save(moderator);
    }

    public async delete(moderator: Moderator): Promise<void> {
        await this.ormRepository.remove(moderator);
    }
}

export default ModeratorRepository;
