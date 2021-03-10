import { EntityRepository, getRepository, Repository } from 'typeorm';
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

    public async all(): Promise<FieldJournalTemplate[] | []> {
        const fieldJournalTemplates = await this.ormRepository.find();

        return fieldJournalTemplates;
    }

    public async delete(
        fieldJournalTemplate: FieldJournalTemplate,
    ): Promise<void> {
        await this.ormRepository.remove(fieldJournalTemplate);
    }
}

export default FieldJournalTemplateRepository;
