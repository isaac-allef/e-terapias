import { EntityRepository, getRepository, Like, Repository } from 'typeorm';
import FieldJournalTemplate from '../entities/FieldJournalTemplate';
import ICreateFieldJournalTemplate from '../../../dtos/ICreateFieldJournalTemplate';
import IFieldJournalTemplateRepository from '../../../repositories/IFieldJournalTemplateRepository';

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

    public async findById(
        id: string,
    ): Promise<FieldJournalTemplate | undefined> {
        const fieldJournalTemplate = await this.ormRepository.findOne({
            where: { id },
        });

        return fieldJournalTemplate;
    }

    public async all(
        orderBy: 'name' | 'created_at' | 'updated_at' = 'name',
        orderMethod: 'ASC' | 'DESC' = 'ASC',
        page = 1,
        limit = 5,
        search = '',
    ): Promise<FieldJournalTemplate[] | []> {
        const orderObject = this.createOrderObject(orderBy, orderMethod);

        const fieldJournalTemplates = await this.ormRepository.find({
            order: orderObject,
            take: limit,
            skip: (page - 1) * limit,
            where: [{ name: Like(`%${search}%`) }],
        });

        return fieldJournalTemplates;
    }

    private createOrderObject(
        orderBy: 'name' | 'created_at' | 'updated_at',
        orderMethod: 'ASC' | 'DESC',
    ) {
        if (orderBy === 'name') {
            return { name: orderMethod };
        }
        if (orderBy === 'created_at') {
            return { created_at: orderMethod };
        }
        if (orderBy === 'updated_at') {
            return { created_at: orderMethod };
        }
        return undefined;
    }

    public async delete(
        fieldJournalTemplate: FieldJournalTemplate,
    ): Promise<void> {
        await this.ormRepository.remove(fieldJournalTemplate);
    }
}

export default FieldJournalTemplateRepository;
