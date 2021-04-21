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

    public async findByIdFilterByModerator({
        id,
        relations,
        moderatorId,
    }: IFindByIdEterapiaFilterByModeratorDTO): Promise<Eterapia | undefined> {
        const query = this.ormRepository.createQueryBuilder('eterapias');

        this.joinRelations(query, relations);

        this.filterByModerator(query, relations, moderatorId);

        query.where('eterapias.id = :id', { id });

        const eterapia = await query.getOne();

        return eterapia;
    }

    public async all({
        orderBy,
        orderMethod,
        page,
        limit,
        relations,
        search,
    }: IListEterapiasDTO): Promise<Eterapia[] | []> {
        const query = this.ormRepository.createQueryBuilder('eterapias');

        this.joinRelations(query, relations);

        this.searchQuery(query, search, relations);

        this.orderBy(query, orderBy, orderMethod);

        this.pagination(query, page, limit);

        const eterapias = await query.getMany();

        return eterapias;
    }

    public async allFilterByModerator({
        orderBy,
        orderMethod,
        page,
        limit,
        moderatorId,
        relations,
        search,
    }: IListEterapiasFilterByModeratorDTO): Promise<Eterapia[] | []> {
        const query = this.ormRepository.createQueryBuilder('eterapias');

        this.joinRelations(query, relations);

        this.searchQuery(query, search, relations);

        this.filterByModerator(query, relations, moderatorId);

        this.orderBy(query, orderBy, orderMethod);

        this.pagination(query, page, limit);

        const eterapias = await query.getMany();

        return eterapias;
    }

    private filterByModerator(
        query: SelectQueryBuilder<Eterapia>,
        relations: string[] | undefined,
        moderatorId: string,
    ): void {
        if (!relations) {
            query.leftJoin('eterapias.moderators', 'moderators');
        } else if (!this.existsInRelations('moderators', relations)) {
            query.leftJoin('eterapias.moderators', 'moderators');
        }

        query.andWhere('moderators.id = :id', { id: moderatorId });
    }

    public async save(eterapia: Eterapia): Promise<void> {
        await this.ormRepository.save(eterapia);
    }

    public async delete(eterapia: Eterapia): Promise<void> {
        await this.ormRepository.remove(eterapia);
    }

    private joinRelations(
        query: SelectQueryBuilder<Eterapia>,
        relations: string[] | undefined,
    ): void {
        relations?.forEach(relation => {
            query.leftJoinAndSelect(`eterapias.${relation}`, relation);
        });
    }

    private orderBy(
        query: SelectQueryBuilder<Eterapia>,
        orderBy: string | undefined,
        method: 'ASC' | 'DESC' = 'ASC',
    ): void {
        if (orderBy) {
            query.orderBy(`eterapias.${orderBy}`, method);
        }
    }

    private pagination(
        query: SelectQueryBuilder<Eterapia>,
        page = 1,
        limit = 5,
    ): void {
        query.take(limit).skip((page - 1) * limit);
    }

    private searchQuery(
        query: SelectQueryBuilder<Eterapia>,
        search: string | undefined,
        relations: string[] | undefined,
    ): void {
        if (!search) {
            return;
        }

        this.searchByEterapiasName(query, search);

        if (relations) {
            if (this.existsInRelations('moderators', relations)) {
                this.searchByModeratorsEmail(query, search);
            }
            if (this.existsInRelations('fieldJournals', relations)) {
                this.searchByFieldJournalsTitle(query, search);
            }
            if (this.existsInRelations('fieldJournalTemplate', relations)) {
                this.searchByFieldJournalTemplateName(query, search);
            }
        }
    }

    private searchByEterapiasName(
        query: SelectQueryBuilder<Eterapia>,
        search: string,
    ): void {
        query.where('eterapias.name ILIKE :searchQuery', {
            searchQuery: `%${search}%`,
        });
    }

    private existsInRelations(
        relationName: string,
        relations: string[],
    ): boolean {
        if (relations.indexOf(relationName) >= 0) {
            return true;
        }
        return false;
    }

    private searchByModeratorsEmail(
        query: SelectQueryBuilder<Eterapia>,
        search: string,
    ): void {
        query.orWhere('moderators.email ILIKE :searchQuery', {
            searchQuery: `%${search}%`,
        });
    }

    private searchByFieldJournalsTitle(
        query: SelectQueryBuilder<Eterapia>,
        search: string,
    ): void {
        query.orWhere('fieldJournals.title ILIKE :searchQuery', {
            searchQuery: `%${search}%`,
        });
    }

    private searchByFieldJournalTemplateName(
        query: SelectQueryBuilder<Eterapia>,
        search: string,
    ): void {
        query.orWhere('fieldJournalTemplate.name ILIKE :searchQuery', {
            searchQuery: `%${search}%`,
        });
    }
}

export default EterapiaRepository;
