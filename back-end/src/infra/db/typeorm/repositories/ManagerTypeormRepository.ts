/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import ManagerTypeorm from '../entities/ManagerTypeorm';
import UploadManagersListRepository, {
    params,
} from '../../../../core/protocols/db/repositories/UploadManagersListRepository';
import Manager from '../../../../core/entities/Manager';
import LoadUserByEmailRepository from '../../../../core/protocols/db/repositories/LoadUserByEmailRepository';
import User from '../../../../core/entities/User';
import UpdateAccessTokenRepository from '../../../../core/protocols/db/repositories/UpdateAccessTokenRepository';
import LoadUserByTokenRepository from '../../../../core/protocols/db/repositories/LoadUserByTokenRepository';

@EntityRepository()
class ManagerTypeormRepository
    implements
        UploadManagersListRepository,
        LoadUserByEmailRepository,
        UpdateAccessTokenRepository,
        LoadUserByTokenRepository {
    private ormRepository: Repository<ManagerTypeorm>;

    constructor() {
        this.ormRepository = getRepository(ManagerTypeorm);
    }

    async upload(data: params): Promise<Manager[]> {
        try {
            const managers = [];

            for (const dto of data) {
                // eslint-disable-next-line no-await-in-loop
                const managerExists = await this.ormRepository.findOne({
                    email: dto.email,
                });

                if (managerExists) {
                    managerExists.name = dto.name;
                    managers.push(managerExists);
                } else {
                    const manager = this.ormRepository.create({
                        name: dto.name,
                        email: dto.email,
                        password: dto.password,
                    });
                    managers.push(manager);
                }
            }

            await this.ormRepository.save(managers);

            return managers;
        } catch {
            throw new Error('Create managers error');
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

export default ManagerTypeormRepository;
