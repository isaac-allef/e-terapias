/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Moderator from '../../../../core/entities/Moderator';
import CreateModeratorsRepository, {
    params,
} from '../../../../core/protocols/db/repositories/CreateModeratorsRepository';
import ModeratorTypeorm from '../entities/ModeratorTypeorm';

@EntityRepository()
class ModeratorTypeormRepository implements CreateModeratorsRepository {
    private ormRepository: Repository<ModeratorTypeorm>;

    constructor() {
        this.ormRepository = getRepository(ModeratorTypeorm);
    }

    public async create(data: params): Promise<Moderator[]> {
        try {
            const moderators = [];

            for (const dto of data) {
                const moderator = this.ormRepository.create({
                    email: dto.email,
                    name: dto.name,
                    password: dto.password,
                });
                moderators.push(moderator);
            }

            await this.ormRepository.save(moderators);

            return moderators;
        } catch (err) {
            throw new Error('Create Moderators error');
        }
    }
}

export default ModeratorTypeormRepository;
