import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateAdministratorDTO from '../../../../administrators/dtos/ICreateAdministratorDTO';
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

    public async findByEmail(email: string): Promise<Moderator | undefined> {
        const moderator = await this.ormRepository.findOne({
            where: { email },
        });

        return moderator;
    }

    public async findById(id: string): Promise<Moderator | undefined> {
        const moderator = await this.ormRepository.findOne({
            where: { id },
        });

        return moderator;
    }

    public async save(moderator: Moderator): Promise<void> {
        await this.ormRepository.save(moderator);
    }
}

export default ModeratorRepository;
