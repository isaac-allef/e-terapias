import { EntityRepository, getRepository, Repository } from 'typeorm';
import FieldJournalTemplate from '../../../../../typeorm/entities/FieldJournalTemplate';
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
}

export default FieldJournalTemplateRepository;
