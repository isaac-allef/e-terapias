import {
    EntityRepository,
    getRepository,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';
import IFieldJournalRepository from '../../../repositories/IFieldJournalRepository';
import FieldJournal from '../entities/FieldJournal';
import ICreateFieldJournal from '../../../dtos/ICreateFieldJournal';
import IFindByIdFieldJournal from '../../../dtos/IFindByIdFieldJournal';
import IListFieldJournals from '../../../dtos/IListFieldJournals';
import IFindByIdFieldJournalFilterByModerator from '../../../dtos/IFindByIdFieldJournalFilterByModerator';
import IListFieldJournalsFilterByModerator from '../../../dtos/IListFieldJournalsFilterByModerator';

@EntityRepository()
class FieldJournalRepository implements IFieldJournalRepository {
    private ormRepository: Repository<FieldJournal>;

    constructor() {
        this.ormRepository = getRepository(FieldJournal);
    }

    public createWithoutSave({
        title,
        eterapia,
        moderator,
    }: ICreateFieldJournal): FieldJournal {
        const fieldJournal = this.ormRepository.create({
            title,
            eterapia,
            moderator,
        });

        return fieldJournal;
    }

    public async save(fieldJournal: FieldJournal): Promise<void> {
        await this.ormRepository.save(fieldJournal);
    }

    public async findById({
        id,
        relations,
    }: IFindByIdFieldJournal): Promise<FieldJournal | undefined> {
        const fieldJournal = await this.ormRepository.findOne({
            where: { id },
            relations,
        });

        return fieldJournal;
    }

    public async all({
        orderBy,
        orderMethod,
        page,
        limit,
        relations,
        search,
    }: IListFieldJournals): Promise<FieldJournal[] | []> {
        const query = this.ormRepository.createQueryBuilder('fieldJournals');

        this.joinRelations(query, relations);

        this.searchQuery(query, search, relations);

        this.orderBy(query, orderBy, orderMethod);

        this.pagination(query, limit, page);

        const fieldJournals = await query.getMany();

        return fieldJournals;
    }

    public async delete(fieldJournal: FieldJournal): Promise<void> {
        await this.ormRepository.remove(fieldJournal);
    }

    public async allFilterByModerator({
        orderBy,
        orderMethod = 'ASC',
        page = 1,
        limit = 5,
        relations,
        moderatorId,
    }: IListFieldJournalsFilterByModerator): Promise<FieldJournal[] | []> {
        const orderObject = orderBy ? { [orderBy]: orderMethod } : undefined;

        const fieldJournal = await this.ormRepository.find({
            order: orderObject,
            take: limit,
            skip: (page - 1) * limit,
            where: [{ moderator: { id: moderatorId } }],
            relations,
        });

        return fieldJournal;
    }

    public async findByIdFilterByModerator({
        id,
        relations,
        moderatorId,
    }: IFindByIdFieldJournalFilterByModerator): Promise<
        FieldJournal | undefined
    > {
        const fieldJournal = await this.ormRepository.findOne({
            where: { id, moderator: { id: moderatorId } },
            relations,
        });

        return fieldJournal;
    }

    private joinRelations(
        query: SelectQueryBuilder<FieldJournal>,
        relations: string[] | undefined,
    ): void {
        relations?.forEach(relation => {
            query.leftJoinAndSelect(`fieldJournals.${relation}`, relation);
        });
    }

    private orderBy(
        query: SelectQueryBuilder<FieldJournal>,
        orderBy: string | undefined,
        method: 'ASC' | 'DESC' = 'ASC',
    ): void {
        if (orderBy) {
            query.orderBy(`fieldJournals.${orderBy}`, method);
        }
    }

    private pagination(
        query: SelectQueryBuilder<FieldJournal>,
        page = 1,
        limit = 5,
    ): void {
        query.take(limit).skip((page - 1) * limit);
    }

    private searchQuery(
        query: SelectQueryBuilder<FieldJournal>,
        search: string | undefined,
        relations: string[] | undefined,
    ): void {
        if (!search) {
            return;
        }

        this.searchByFieldJournalsTitle(query, search);

        if (relations) {
            if (this.existsInRelations('moderator', relations)) {
                this.searchByModeratorEmail(query, search);
            }
            if (this.existsInRelations('eterapia', relations)) {
                this.searchByEterapiaName(query, search);
            }
        }
    }

    private searchByFieldJournalsTitle(
        query: SelectQueryBuilder<FieldJournal>,
        search: string,
    ): void {
        query.where('fieldJournals.title ILIKE :searchQuery', {
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

    private searchByEterapiaName(
        query: SelectQueryBuilder<FieldJournal>,
        search: string,
    ): void {
        query.orWhere('eterapia.name ILIKE :searchQuery', {
            searchQuery: `%${search}%`,
        });
    }

    private searchByModeratorEmail(
        query: SelectQueryBuilder<FieldJournal>,
        search: string,
    ): void {
        query.orWhere('moderator.email ILIKE :searchQuery', {
            searchQuery: `%${search}%`,
        });
    }
}

export default FieldJournalRepository;
