import { EntityRepository, getRepository, Repository } from 'typeorm';
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
        orderMethod = 'ASC',
        page = 1,
        limit = 5,
        relations,
    }: IListFieldJournalsTemplates): Promise<FieldJournalTemplate[] | []> {
        const orderObject = orderBy ? { [orderBy]: orderMethod } : undefined;

        const fieldJournalTemplates = await this.ormRepository.find({
            order: orderObject,
            take: limit,
            skip: (page - 1) * limit,
            relations,
        });

        return fieldJournalTemplates;
    }

    public async delete(
        fieldJournalTemplate: FieldJournalTemplate,
    ): Promise<void> {
        await this.ormRepository.remove(fieldJournalTemplate);
    }
}

export default FieldJournalTemplateRepository;
