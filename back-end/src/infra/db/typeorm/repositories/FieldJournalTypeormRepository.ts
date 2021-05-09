/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import FieldJournal from '../../../../core/entities/FieldJournal';
import CreateFieldJournalRepository, {
    params as createParams,
} from '../../../../core/protocols/db/repositories/CreateFieldJournalRepository';
import LoadAllFieldJournalsPerModeratorRepository, {
    params as loadAllPerModeratorParams,
} from '../../../../core/protocols/db/repositories/LoadAllFieldJournalsPerModeratorRepository';
import LoadFieldJournalByIdRepository from '../../../../core/protocols/db/repositories/LoadFieldJournalByIdRepository';
import SearchFieldJournalsPerModeratorRepository, {
    params,
} from '../../../../core/protocols/db/repositories/SearchFieldJournalsPerModeratorRepository';
import FieldJournalTypeorm from '../entities/FieldJournalTypeorm';

@EntityRepository()
class FieldJournalTypeormRepository
    implements
        CreateFieldJournalRepository,
        LoadFieldJournalByIdRepository,
        LoadAllFieldJournalsPerModeratorRepository,
        SearchFieldJournalsPerModeratorRepository {
    private ormRepository: Repository<FieldJournalTypeorm>;

    constructor() {
        this.ormRepository = getRepository(FieldJournalTypeorm);
    }

    public async create(data: createParams): Promise<FieldJournal> {
        try {
            const { name, fields, moderator, etherapy } = data;
            const fieldJournal = this.ormRepository.create({
                name,
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
        moderatorId,
        sort,
        direction,
        per_page,
        page,
    }: loadAllPerModeratorParams): Promise<FieldJournal[]> {
        try {
            const etherapies = await this.ormRepository.find({
                where: { moderator: { id: moderatorId } },
                order: { [sort]: direction.toUpperCase() },
                take: per_page,
                skip: (page - 1) * per_page,
                relations: ['etherapy'],
            });

            return etherapies;
        } catch (err) {
            throw new Error('Load all fieldJournals per moderator error');
        }
    }

    async searchPerModerator({
        moderatorId,
        keywords,
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
                .orWhere('etherapy.name ILIKE :name', {
                    name: `%${keywords}%`,
                })
                .andWhere('FieldJournal.id = :id', {
                    id: moderatorId,
                })
                .getMany();

            return finded;
        } catch {
            throw new Error('Search field journals per moderator error');
        }
    }
}

export default FieldJournalTypeormRepository;
