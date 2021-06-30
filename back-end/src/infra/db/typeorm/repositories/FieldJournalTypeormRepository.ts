/* eslint-disable no-restricted-syntax */
import { Between, EntityRepository, getRepository, Repository } from 'typeorm';
import FieldJournal from '../../../../core/entities/FieldJournal';
import CountFieldJournalsRepository, {
    filterDate,
} from '../../../../core/protocols/db/repositories/CountFieldJournalsRepository';
import CreateFieldJournalRepository, {
    params as createParams,
} from '../../../../core/protocols/db/repositories/CreateFieldJournalRepository';
import LoadAllFieldJournalsPerEtherapyRepository, {
    params as loadAllPerEtherapyParams,
} from '../../../../core/protocols/db/repositories/LoadAllFieldJournalsPerEtherapyRepository';
import LoadAllFieldJournalsPerModeratorRepository, {
    params as loadAllPerModeratorParams,
} from '../../../../core/protocols/db/repositories/LoadAllFieldJournalsPerModeratorRepository';
import LoadAllFieldJournalsRepository, {
    params as loadAllParams,
} from '../../../../core/protocols/db/repositories/LoadAllFieldJournalsRepository';
import LoadFieldJournalByIdRepository from '../../../../core/protocols/db/repositories/LoadFieldJournalByIdRepository';
import SearchFieldJournalsPerModeratorRepository, {
    params,
} from '../../../../core/protocols/db/repositories/SearchFieldJournalsPerModeratorRepository';
import SearchFieldJournalsRepository, {
    params as searchParams,
} from '../../../../core/protocols/db/repositories/SearchFieldJournalsRepository';
import UpdateFieldJournalRepository, {
    params as updateParams,
} from '../../../../core/protocols/db/repositories/UpdateFieldJournalRepository';
import FieldJournalTypeorm from '../entities/FieldJournalTypeorm';

@EntityRepository()
class FieldJournalTypeormRepository
    implements
        CreateFieldJournalRepository,
        LoadFieldJournalByIdRepository,
        LoadAllFieldJournalsPerModeratorRepository,
        SearchFieldJournalsPerModeratorRepository,
        LoadAllFieldJournalsPerEtherapyRepository,
        UpdateFieldJournalRepository,
        LoadAllFieldJournalsRepository,
        SearchFieldJournalsRepository,
        CountFieldJournalsRepository {
    private ormRepository: Repository<FieldJournalTypeorm>;

    constructor() {
        this.ormRepository = getRepository(FieldJournalTypeorm);
    }

    public async create(data: createParams): Promise<FieldJournal> {
        try {
            const { name, date, fields, moderator, etherapy } = data;
            const fieldJournal = this.ormRepository.create({
                name,
                date,
                fields,
                moderator,
                etherapy,
            });

            await this.ormRepository.save(fieldJournal);

            return fieldJournal;
        } catch {
            throw new Error('Create FieldJournal error');
        }
    }

    async load(id: string): Promise<FieldJournal> {
        try {
            const fieldJournal = await this.ormRepository.findOne({
                where: { id },
                relations: ['moderator', 'etherapy'],
            });

            if (!fieldJournal) {
                throw new Error('Field Journal not found');
            }

            return fieldJournal;
        } catch {
            throw new Error('Load fieldJournal error');
        }
    }

    async loadAllPerModerator({
        offerId,
        moderatorId,
        sort,
        direction,
        per_page,
        page,
    }: loadAllPerModeratorParams): Promise<FieldJournal[]> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder(
                'FieldJournal',
            );

            queryBuilder
                .leftJoin('FieldJournal.moderator', 'moderator')
                .leftJoinAndSelect('FieldJournal.etherapy', 'etherapy')
                .leftJoinAndSelect('etherapy.offer', 'offer');

            queryBuilder.where('moderator.id = :id', { id: moderatorId });

            if (offerId) {
                queryBuilder.where('offer.id = :id', { id: offerId });
            }

            queryBuilder
                .orderBy(
                    `FieldJournal.${sort}`,
                    direction.toUpperCase() as 'ASC' | 'DESC',
                )
                .take(per_page)
                .skip((page - 1) * per_page);

            const fieldJournals = await queryBuilder.getMany();

            return fieldJournals;
        } catch (err) {
            throw new Error('Load all fieldJournals per moderator error');
        }
    }

    async searchPerModerator({
        moderatorId,
        keywords,
        per_page,
        page,
    }: params): Promise<FieldJournal[]> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder(
                'FieldJournal',
            );

            const finded = queryBuilder
                .leftJoinAndSelect('FieldJournal.etherapy', 'etherapy')
                .where('FieldJournal.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .andWhere('FieldJournal.moderatorId = :id', {
                    id: moderatorId,
                })
                .orWhere('etherapy.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .andWhere('FieldJournal.moderatorId = :id', {
                    id: moderatorId,
                })
                .orWhere('etherapy.identifier ILIKE :identifier', {
                    identifier: `%${keywords}%`,
                })
                .andWhere('FieldJournal.moderatorId = :id', {
                    id: moderatorId,
                })
                .take(per_page)
                .skip((page - 1) * per_page)
                .getMany();

            return finded;
        } catch {
            throw new Error('Search field journals per moderator error');
        }
    }

    async loadAllPerEtherapy({
        offerId,
        etherapyId,
        sort,
        direction,
        per_page,
        page,
    }: loadAllPerEtherapyParams): Promise<FieldJournal[]> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder(
                'FieldJournal',
            );

            queryBuilder
                .leftJoinAndSelect('FieldJournal.moderator', 'moderator')
                .leftJoin('FieldJournal.etherapy', 'etherapy')
                .leftJoinAndSelect('etherapy.offer', 'offer');

            queryBuilder.where('etherapy.id = :id', { id: etherapyId });

            if (offerId) {
                queryBuilder.where('offer.id = :id', { id: offerId });
            }

            queryBuilder
                .orderBy(
                    `FieldJournal.${sort}`,
                    direction.toUpperCase() as 'ASC' | 'DESC',
                )
                .take(per_page)
                .skip((page - 1) * per_page);

            const fieldJournals = await queryBuilder.getMany();

            return fieldJournals;
        } catch (err) {
            throw new Error('Load all fieldJournals per etherapy error');
        }
    }

    async update({
        id,
        name,
        date,
        fields,
    }: updateParams): Promise<FieldJournal> {
        try {
            const fieldJournal = await this.ormRepository.findOne({
                where: { id },
            });

            if (!fieldJournal) {
                throw new Error('Field Journal not found');
            }

            fieldJournal.name = name;
            fieldJournal.date = date;
            fieldJournal.fields = fields;

            await this.ormRepository.save(fieldJournal);

            return fieldJournal;
        } catch {
            throw new Error('Update fieldJournal error');
        }
    }

    async loadAll({
        offerId,
        sort,
        direction,
        per_page,
        page,
    }: loadAllParams): Promise<FieldJournal[]> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder(
                'FieldJournal',
            );

            queryBuilder
                .leftJoinAndSelect('FieldJournal.moderator', 'moderator')
                .leftJoinAndSelect('FieldJournal.etherapy', 'etherapy')
                .leftJoinAndSelect('etherapy.offer', 'offer');

            if (offerId) {
                queryBuilder.where('offer.id = :id', { id: offerId });
            }

            queryBuilder
                .orderBy(
                    `FieldJournal.${sort}`,
                    direction.toUpperCase() as 'ASC' | 'DESC',
                )
                .take(per_page)
                .skip((page - 1) * per_page);

            const fieldJournals = await queryBuilder.getMany();

            return fieldJournals;
        } catch (err) {
            throw new Error('Load all field journals error');
        }
    }

    async search({
        keywords,
        per_page,
        page,
    }: searchParams): Promise<FieldJournal[]> {
        try {
            const queryBuilder = this.ormRepository.createQueryBuilder(
                'FieldJournal',
            );

            const finded = queryBuilder
                .leftJoinAndSelect('FieldJournal.moderator', 'moderator')
                .leftJoinAndSelect('FieldJournal.etherapy', 'etherapy')
                .where('FieldJournal.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .orWhere('etherapy.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .orWhere('etherapy.identifier ILIKE :identifier', {
                    identifier: `%${keywords}%`,
                })
                .orWhere('moderator.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .orWhere('moderator.email ILIKE :email', {
                    email: `%${keywords}%`,
                })
                .take(per_page)
                .skip((page - 1) * per_page)
                .getMany();

            return finded;
        } catch {
            throw new Error('Search filed journals error');
        }
    }

    async count(data: filterDate): Promise<number> {
        try {
            let count = null;

            if (data) {
                count = await this.ormRepository.count({
                    date: Between(data.begin, data.end),
                });
            } else {
                count = await this.ormRepository.count();
            }

            if (count === null) {
                throw new Error('Count field journals error.');
            }

            return count;
        } catch {
            throw new Error('Count field journals error.');
        }
    }
}

export default FieldJournalTypeormRepository;
