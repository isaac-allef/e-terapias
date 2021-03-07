import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateFieldJournal from '../../dtos/ICreateFieldJournal';
import IFieldJournalRepository from '../../repositories/IFieldJournalRepository';
import FieldJournal from '../entities/FieldJournal';

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

    public async findById(id: string): Promise<FieldJournal | undefined> {
        const fieldJournal = await this.ormRepository.findOne({
            where: { id },
        });

        return fieldJournal;
    }

    public async all(): Promise<FieldJournal[] | []> {
        const fieldJournal = await this.ormRepository.find();

        return fieldJournal;
    }
}

export default FieldJournalRepository;
