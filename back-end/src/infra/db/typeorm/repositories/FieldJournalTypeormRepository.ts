/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import FieldJournal from '../../../../core/entities/FieldJournal';
import CreateFieldJournalRepository, {
    params,
} from '../../../../core/protocols/db/repositories/CreateFieldJournalRepository';
import LoadFieldJournalByIdRepository from '../../../../core/protocols/db/repositories/LoadFieldJournalByIdRepository';
import FieldJournalTypeorm from '../entities/FieldJournalTypeorm';

@EntityRepository()
class FieldJournalTypeormRepository
    implements CreateFieldJournalRepository, LoadFieldJournalByIdRepository {
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

    async load(id: string): Promise<FieldJournal> {
        try {
            const fieldJournal = await this.ormRepository.findOne({
                where: { id },
                relations: ['moderator', 'etherapy'],
            });

            if (!fieldJournal) {
                throw new Error('Field Journal not found');
            }

            return fieldJournal;
        } catch {
            throw new Error('Load fieldJournal error');
        }
    }
}

export default FieldJournalTypeormRepository;
