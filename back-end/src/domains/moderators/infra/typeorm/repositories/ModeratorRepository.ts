import {
    EntityRepository,
    getRepository,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';
import ICreateAdministratorDTO from '../../../../administrators/dtos/ICreateAdministratorDTO';
import IFindByEmailModeratorDTO from '../../../dtos/IFindByEmailModeratorDTO';
import IFindByIdModeratorDTO from '../../../dtos/IFindByIdModeratorDTO';
import IListModeratorsDTO from '../../../dtos/IListModeratorsDTO';
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

    public async findByEmail({
        email,
        relations,
    }: IFindByEmailModeratorDTO): Promise<Moderator | undefined> {
        const moderator = await this.ormRepository.findOne({
            where: { email },
            relations,
        });

        return moderator;
    }

    public async findById({
        id,
        relations,
    }: IFindByIdModeratorDTO): Promise<Moderator | undefined> {
        const moderator = await this.ormRepository.findOne({
            where: { id },
            relations,
        });

        return moderator;
    }

    public async all({
        orderBy,
        orderMethod,
        page,
        limit,
        relations,
        search,
    }: IListModeratorsDTO): Promise<Moderator[] | []> {
        const query = this.ormRepository.createQueryBuilder('moderators');

        this.joinRelations(query, relations);

        this.searchQuery(query, search, relations);

        this.orderBy(query, orderBy, orderMethod);

        this.pagination(query, page, limit);

        const moderators = await query.getMany();

        return moderators;
    }

    public async save(moderator: Moderator): Promise<void> {
        await this.ormRepository.save(moderator);
    }

    public async delete(moderator: Moderator): Promise<void> {
        await this.ormRepository.remove(moderator);
    }

    private joinRelations(
        query: SelectQueryBuilder<Moderator>,
        relations: string[] | undefined,
    ): void {
        relations?.forEach(relation => {
            query.leftJoinAndSelect(`moderators.${relation}`, relation);
        });
    }

    private orderBy(
        query: SelectQueryBuilder<Moderator>,
        orderBy: string | undefined,
        method: 'ASC' | 'DESC' = 'ASC',
    ): void {
        if (orderBy) {
            query.orderBy(`moderators.${orderBy}`, method);
        }
    }

    private pagination(
        query: SelectQueryBuilder<Moderator>,
        page = 1,
        limit = 5,
    ): void {
        query.take(limit).skip((page - 1) * limit);
    }

    private searchQuery(
        query: SelectQueryBuilder<Moderator>,
        search: string | undefined,
        relations: string[] | undefined,
    ): void {
        if (!search) {
            return;
        }

        this.searchByModeratorsEmail(query, search);

        if (relations) {
            if (this.existsInRelations('eterapias', relations)) {
                this.searchByEterapiasName(query, search);
            }
            if (this.existsInRelations('fieldJournals', relations)) {
                this.searchByFieldJournalsTitle(query, search);
            }
        }
    }

    private searchByModeratorsEmail(
        query: SelectQueryBuilder<Moderator>,
        search: string,
    ): void {
        query.where('moderators.email ILIKE :searchQuery', {
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

    private searchByEterapiasName(
        query: SelectQueryBuilder<Moderator>,
        search: string,
    ): void {
        query.orWhere('eterapias.name ILIKE :searchQuery', {
            searchQuery: `%${search}%`,
        });
    }

    private searchByFieldJournalsTitle(
        query: SelectQueryBuilder<Moderator>,
        search: string,
    ): void {
        query.orWhere('fieldJournals.title ILIKE :searchQuery', {
            searchQuery: `%${search}%`,
        });
    }
}

export default ModeratorRepository;
