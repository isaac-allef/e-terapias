import {
    EntityRepository,
    getRepository,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';
import ICreateEterapiaDTO from '../../../dtos/ICreateEterapiaDTO';
import IFindByIdEterapiaDTO from '../../../dtos/IFindByIdEterapiaDTO';
import IFindByIdEterapiaFilterByModeratorDTO from '../../../dtos/IFindByIdEterapiaFilterByModeratorDTO';
import IFindByNameEterapiaDTO from '../../../dtos/IFindByNameEterapiaDTO';
import IListEterapiasDTO from '../../../dtos/IListEterapiasDTO';
import IListEterapiasFilterByModeratorDTO from '../../../dtos/IListEterapiasFilterByModeratorDTO';
import IEterapiaRepository from '../../../repositories/IEterapiaRepository';
import Eterapia from '../entities/Eterapia';

@EntityRepository()
class EterapiaRepository implements IEterapiaRepository {
    private ormRepository: Repository<Eterapia>;

    constructor() {
        this.ormRepository = getRepository(Eterapia);
    }

    public async create({ name }: ICreateEterapiaDTO): Promise<Eterapia> {
        const eterapia = this.ormRepository.create({ name });

        await this.ormRepository.save(eterapia);

        return eterapia;
    }

    public createWithoutSave({ name }: ICreateEterapiaDTO): Eterapia {
        const eterapia = this.ormRepository.create({ name });

        return eterapia;
    }

    public async findById({
        id,
        relations,
    }: IFindByIdEterapiaDTO): Promise<Eterapia | undefined> {
        const eterapia = await this.ormRepository.findOne({
            where: { id },
            relations,
        });

        return eterapia;
    }

    public async findByName({
        name,
        relations,
    }: IFindByNameEterapiaDTO): Promise<Eterapia | undefined> {
        const eterapia = await this.ormRepository.findOne({
            where: { name },
            relations,
        });

        return eterapia;
    }

    public async all({
        orderBy = 'name',
        orderMethod = 'ASC',
        page = 1,
        limit = 5,
        relations,
        search,
    }: IListEterapiasDTO): Promise<Eterapia[] | []> {
        const query = this.ormRepository.createQueryBuilder('eterapias');

        relations?.forEach(relation => {
            query.leftJoinAndSelect(`eterapias.${relation}`, relation);
        });

        if (search) {
            this.searchQuery(query, search, relations);
        }

        query
            .orderBy(`eterapias.${orderBy}`, orderMethod)
            .take(limit)
            .skip((page - 1) * limit);

        const eterapias = await query.getMany();

        return eterapias;
    }

    public async allFilterByModerator({
        orderBy = 'name',
        orderMethod = 'ASC',
        page = 1,
        limit = 5,
        moderatorId,
        relations,
    }: IListEterapiasFilterByModeratorDTO): Promise<Eterapia[] | []> {
        const query = this.ormRepository.createQueryBuilder('eterapias');

        relations?.forEach(relation => {
            query.leftJoinAndSelect(`eterapias.${relation}`, relation);
        });

        if (!relations) {
            query.leftJoin('eterapias.moderators', 'moderators');
        } else if (relations.indexOf('moderators') < 0) {
            query.leftJoin('eterapias.moderators', 'moderators');
        }

        query
            .where('moderators.id = :id', { id: moderatorId })
            .orderBy(`eterapias.${orderBy}`, orderMethod)
            .take(limit)
            .skip((page - 1) * limit);

        const eterapias = await query.getMany();

        return eterapias;
    }

    public async findByIdFilterByModerator({
        id,
        relations,
        moderatorId,
    }: IFindByIdEterapiaFilterByModeratorDTO): Promise<Eterapia | undefined> {
        const query = this.ormRepository.createQueryBuilder('eterapias');

        relations?.forEach(relation => {
            query.leftJoinAndSelect(`eterapias.${relation}`, relation);
        });

        if (!relations) {
            query.leftJoin('eterapias.moderators', 'moderators');
        } else if (relations.indexOf('moderators') < 0) {
            query.leftJoin('eterapias.moderators', 'moderators');
        }

        query
            .where('moderators.id = :moderatorId', { moderatorId })
            .andWhere('eterapias.id = :id', { id });

        const eterapia = await query.getOne();

        return eterapia;
    }

    public async save(eterapia: Eterapia): Promise<void> {
        await this.ormRepository.save(eterapia);
    }

    public async delete(eterapia: Eterapia): Promise<void> {
        await this.ormRepository.remove(eterapia);
    }

    private searchQuery(
        query: SelectQueryBuilder<Eterapia>,
        search: string,
        relations: string[] | undefined,
    ): void {
        query.where('eterapias.name ILIKE :searchQuery', {
            searchQuery: `%${search}%`,
        });
        if (relations) {
            if (relations.indexOf('moderators') >= 0) {
                query.orWhere('moderators.email ILIKE :searchQuery', {
                    searchQuery: `%${search}%`,
                });
            }
            if (relations.indexOf('fieldJournals') >= 0) {
                query.orWhere('fieldJournals.title ILIKE :searchQuery', {
                    searchQuery: `%${search}%`,
                });
            }
            if (relations.indexOf('fieldJournalTemplate') >= 0) {
                query.orWhere('fieldJournalTemplate.name ILIKE :searchQuery', {
                    searchQuery: `%${search}%`,
                });
            }
        }
    }
}

export default EterapiaRepository;
