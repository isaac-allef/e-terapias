/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Moderator from '../../../../core/entities/Moderator';
import CreateModeratorsRepository, {
    params,
} from '../../../../core/protocols/db/repositories/CreateModeratorsRepository';
import LoadModeratorByIdRepository from '../../../../core/protocols/db/repositories/LoadModeratorByIdRepository';
import ModeratorTypeorm from '../entities/ModeratorTypeorm';

@EntityRepository()
class ModeratorTypeormRepository
    implements CreateModeratorsRepository, LoadModeratorByIdRepository {
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

    async load(id: string): Promise<Moderator> {
        try {
            const moderator = await this.ormRepository.findOne({
                where: { id },
                relations: [
                    'fieldJournals',
                    'etherapies',
                    'etherapies.template',
                ],
            });

            if (!moderator) {
                throw new Error('Moderator not found');
            }

            return moderator;
        } catch {
            throw new Error('Load moderator error');
        }
    }
}

export default ModeratorTypeormRepository;
