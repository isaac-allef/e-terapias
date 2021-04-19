import {
    EntityRepository,
    getRepository,
    Repository,
    SelectQueryBuilder,
} from 'typeorm';
import FieldJournalTemplate from '../entities/FieldJournalTemplate';
import ICreateFieldJournalTemplate from '../../../dtos/ICreateFieldJournalTemplate';
import IFieldJournalTemplateRepository from '../../../repositories/IFieldJournalTemplateRepository';
import IFindByIdFieldJournalTemplate from '../../../dtos/IFindByIdFieldJournalTemplate';
import IListFieldJournalsTemplates from '../../../dtos/IListFieldJournalsTemplates';

@EntityRepository()
class FieldJournalTemplateRepository
    implements IFieldJournalTemplateRepository {
    private ormRepository: Repository<FieldJournalTemplate>;

    constructor() {
        this.ormRepository = getRepository(FieldJournalTemplate);
    }

    public async create({
        name,
        description,
    }: ICreateFieldJournalTemplate): Promise<FieldJournalTemplate> {
        const fieldJournalTemplate = this.ormRepository.create({
            name,
            description,
        });

        await this.ormRepository.save(fieldJournalTemplate);

        return fieldJournalTemplate;
    }

    public async findById({
        id,
        relations,
    }: IFindByIdFieldJournalTemplate): Promise<
        FieldJournalTemplate | undefined
    > {
        const fieldJournalTemplate = await this.ormRepository.findOne({
            where: { id },
            relations,
        });

        return fieldJournalTemplate;
    }

    public async all({
        orderBy,
        orderMethod,
        page,
        limit,
        relations,
        search,
    }: IListFieldJournalsTemplates): Promise<FieldJournalTemplate[] | []> {
        const query = this.ormRepository.createQueryBuilder(
            'fieldJournalTemplates',
        );

        this.joinRelations(query, relations);

        this.searchQuery(query, search, relations);

        this.orderBy(query, orderBy, orderMethod);

        this.pagination(query, limit, page);

        const fieldJournalTemplates = await query.getMany();

        return fieldJournalTemplates;
    }

    public async delete(
        fieldJournalTemplate: FieldJournalTemplate,
    ): Promise<void> {
        await this.ormRepository.remove(fieldJournalTemplate);
    }

    private joinRelations(
        query: SelectQueryBuilder<FieldJournalTemplate>,
        relations: string[] | undefined,
    ): void {
        relations?.forEach(relation => {
            query.leftJoinAndSelect(
                `fieldJournalTemplates.${relation}`,
                relation,
            );
        });
    }

    private orderBy(
        query: SelectQueryBuilder<FieldJournalTemplate>,
        orderBy: string | undefined,
        method: 'ASC' | 'DESC' = 'ASC',
    ): void {
        if (orderBy) {
            query.orderBy(`fieldJournalTemplates.${orderBy}`, method);
        }
    }

    private pagination(
        query: SelectQueryBuilder<FieldJournalTemplate>,
        page = 1,
        limit = 5,
    ): void {
        query.take(limit).skip((page - 1) * limit);
    }

    private searchQuery(
        query: SelectQueryBuilder<FieldJournalTemplate>,
        search: string | undefined,
        relations: string[] | undefined,
    ): void {
        if (!search) {
            return;
        }

        this.searchByFieldJournalTemplatesName(query, search);

        if (relations) {
            if (this.existsInRelations('eterapias', relations)) {
                this.searchByEterapiasName(query, search);
            }
        }
    }

    private searchByFieldJournalTemplatesName(
        query: SelectQueryBuilder<FieldJournalTemplate>,
        search: string,
    ): void {
        query.where('fieldJournalTemplates.name ILIKE :searchQuery', {
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
        query: SelectQueryBuilder<FieldJournalTemplate>,
        search: string,
    ): void {
        query.orWhere('eterapias.name ILIKE :searchQuery', {
            searchQuery: `%${search}%`,
        });
    }
}

export default FieldJournalTemplateRepository;
