/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Moderator from '../../../../core/entities/Moderator';
import User from '../../../../core/entities/User';
import CreateModeratorsRepository, {
    params,
} from '../../../../core/protocols/db/repositories/CreateModeratorsRepository';
import LoadModeratorByIdRepository from '../../../../core/protocols/db/repositories/LoadModeratorByIdRepository';
import LoadUserByEmailRepository from '../../../../core/protocols/db/repositories/LoadUserByEmailRepository';
import LoadUserByTokenRepository from '../../../../core/protocols/db/repositories/LoadUserByTokenRepository';
import UpdateAccessTokenRepository from '../../../../core/protocols/db/repositories/UpdateAccessTokenRepository';
import ModeratorTypeorm from '../entities/ModeratorTypeorm';

@EntityRepository()
class ModeratorTypeormRepository
    implements
        CreateModeratorsRepository,
        LoadModeratorByIdRepository,
        LoadUserByEmailRepository,
        UpdateAccessTokenRepository,
        LoadUserByTokenRepository {
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

    async loadByEmail(email: string): Promise<User> {
        try {
            const user = await this.ormRepository.findOne({
                where: { email },
            });

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch {
            throw new Error('Load user error');
        }
    }

    async updateAccessToken(id: string, token: string): Promise<User> {
        try {
            const user = await this.ormRepository.findOne({
                where: { id },
            });

            if (!user) {
                throw new Error('User not found');
            }

            user.token = token;

            await this.ormRepository.save(user);

            return user;
        } catch {
            throw new Error('Load user error');
        }
    }

    async loadByToken(accessToken: string, role?: string): Promise<User> {
        try {
            let user;

            if (role) {
                user = await this.ormRepository.findOne({
                    where: { token: accessToken, role },
                });
            } else {
                user = await this.ormRepository.findOne({
                    where: { token: accessToken },
                });
            }

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch {
            throw new Error('Load by token user error');
        }
    }
}

export default ModeratorTypeormRepository;
