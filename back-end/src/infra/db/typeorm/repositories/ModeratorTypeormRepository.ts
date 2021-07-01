/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Moderator from '../../../../core/entities/Moderator';
import User from '../../../../core/entities/User';
import ChangePasswordRepository, {
    params as changePasswordParams,
} from '../../../../core/protocols/db/repositories/ChangePasswordRepository';
import CreateModeratorsRepository, {
    params,
} from '../../../../core/protocols/db/repositories/UploadModeratorsListRepository';
import LoadAllModeratorsRepository, {
    params as loadAllParams,
} from '../../../../core/protocols/db/repositories/LoadAllModeratorsRepository';
import LoadModeratorByIdRepository from '../../../../core/protocols/db/repositories/LoadModeratorByIdRepository';
import LoadUserByEmailRepository from '../../../../core/protocols/db/repositories/LoadUserByEmailRepository';
import LoadUserByTokenRepository from '../../../../core/protocols/db/repositories/LoadUserByTokenRepository';
import SearchModeratorsRepository, {
    params as searchParams,
} from '../../../../core/protocols/db/repositories/SearchModeratorsRepository';
import UpdateAccessTokenRepository from '../../../../core/protocols/db/repositories/UpdateAccessTokenRepository';
import ModeratorTypeorm from '../entities/ModeratorTypeorm';
import CountModeratorsRepository from '../../../../core/protocols/db/repositories/CountModeratorsRepository';

@EntityRepository()
class ModeratorTypeormRepository
    implements
        CreateModeratorsRepository,
        LoadModeratorByIdRepository,
        LoadUserByEmailRepository,
        UpdateAccessTokenRepository,
        LoadUserByTokenRepository,
        ChangePasswordRepository,
        LoadAllModeratorsRepository,
        SearchModeratorsRepository,
        CountModeratorsRepository {
    private ormRepository: Repository<ModeratorTypeorm>;

    constructor() {
        this.ormRepository = getRepository(ModeratorTypeorm);
    }

    public async upload(data: params): Promise<Moderator[]> {
        try {
            const { moderatorsData, offer } = data;
            const moderators = [];

            for (const dto of moderatorsData) {
                // eslint-disable-next-line no-await-in-loop
                const moderatorExists = await this.ormRepository.findOne({
                    where: { email: dto.email },
                    relations: ['etherapies', 'etherapies.offer'],
                });

                if (moderatorExists) {
                    moderatorExists.name = dto.name;

                    const etherapiesOfOtherOffer = moderatorExists.etherapies.filter(
                        etherapy => etherapy.offer.id !== offer.id,
                    );

                    const etherapiesOfThisOffer = dto.etherapies.filter(
                        etherapy => etherapy.offer.id === offer.id,
                    );

                    moderatorExists.etherapies = [
                        ...etherapiesOfOtherOffer,
                        ...etherapiesOfThisOffer,
                    ];

                    moderators.push(moderatorExists);
                } else {
                    const moderator = this.ormRepository.create({
                        email: dto.email,
                        name: dto.name,
                        password: dto.password,
                        etherapies: dto.etherapies,
                    });
                    moderators.push(moderator);
                }
            }

            await this.ormRepository.save(moderators);

            return moderators;
        } catch (err) {
            throw new Error('Create Moderators error');
        }
    }

    async load(id: string, offerId: string): Promise<Moderator> {
        try {
            const moderator = await this.ormRepository.findOne({
                where: { id },
                relations: [
                    'etherapies',
                    'etherapies.template',
                    'etherapies.offer',
                ],
            });

            if (!moderator) {
                throw new Error('Moderator not found');
            }

            if (offerId) {
                moderator.etherapies = moderator.etherapies.filter(
                    etherapy => etherapy.offer.id === offerId,
                );
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

    async changePassword({
        token,
        password,
    }: changePasswordParams): Promise<boolean> {
        try {
            const user = await this.ormRepository.findOne({
                where: { token },
            });

            if (!user) {
                throw new Error('User not found');
            }

            user.password = password;

            await this.ormRepository.save(user);

            return true;
        } catch {
            throw new Error('Change password user error');
        }
    }

    async loadAll({
        offerId,
        sort,
        direction,
        per_page,
        page,
    }: loadAllParams): Promise<Moderator[]> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder(
                'Moderator',
            );

            queryBuilder
                .leftJoinAndSelect('Moderator.etherapies', 'etherapies')
                .leftJoinAndSelect('etherapies.offer', 'offer');

            if (offerId) {
                queryBuilder.where('offer.id = :id', { id: offerId });
            }

            queryBuilder
                .orderBy(
                    `Moderator.${sort}`,
                    direction.toUpperCase() as 'ASC' | 'DESC',
                )
                .take(per_page)
                .skip((page - 1) * per_page);

            const moderators = await queryBuilder.getMany();

            return moderators;
        } catch (err) {
            throw new Error('Load all moderators error');
        }
    }

    async search({
        keywords,
        per_page,
        page,
    }: searchParams): Promise<Moderator[]> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder(
                'Moderator',
            );

            const finded = queryBuilder
                .leftJoinAndSelect('Moderator.etherapies', 'etherapies')
                .where('Moderator.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .orWhere('Moderator.email ILIKE :email', {
                    email: `%${keywords}%`,
                })
                .orWhere('etherapies.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .orWhere('etherapies.identifier ILIKE :email', {
                    email: `%${keywords}%`,
                })
                .take(per_page)
                .skip((page - 1) * per_page)
                .getMany();

            return finded;
        } catch {
            throw new Error('Search moderator error');
        }
    }

    async count(offerId: string): Promise<number> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder(
                'Moderator',
            );

            if (offerId) {
                queryBuilder
                    .leftJoin('Moderator.etherapies', 'etherapies')
                    .leftJoin('etherapies.offer', 'offer')
                    .where('offer.id = :id', {
                        id: offerId,
                    });
            }

            return queryBuilder.getCount();
        } catch {
            throw new Error('Count moderators error.');
        }
    }
}

export default ModeratorTypeormRepository;
