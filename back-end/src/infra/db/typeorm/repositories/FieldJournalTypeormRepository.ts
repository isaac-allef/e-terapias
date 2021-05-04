/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import FieldJournal from '../../../../core/entities/FieldJournal';
import CreateFieldJournalRepository, {
    params,
} from '../../../../core/protocols/db/repositories/CreateFieldJournalRepository';
import FieldJournalTypeorm from '../entities/FieldJournalTypeorm';

@EntityRepository()
class FieldJournalTypeormRepository implements CreateFieldJournalRepository {
    private ormRepository: Repository<FieldJournalTypeorm>;

    constructor() {
        this.ormRepository = getRepository(FieldJournalTypeorm);
    }

    public async create(data: params): Promise<FieldJournal> {
        try {
            const { name, fields, moderator, etherapy } = data;
            const fieldJournal = this.ormRepository.create({
                name,
                fields,
                moderator,
                etherapy,
            });

            await this.ormRepository.save(fieldJournal);

            return fieldJournal;
        } catch {
            throw new Error('Create FieldJournal error');
        }
    }
}

export default FieldJournalTypeormRepository;
