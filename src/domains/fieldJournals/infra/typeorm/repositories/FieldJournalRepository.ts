import { EntityRepository, getRepository, Like, Repository } from 'typeorm';
import IFieldJournalRepository from '../../../repositories/IFieldJournalRepository';
import FieldJournal from '../entities/FieldJournal';
import ICreateFieldJournal from '../../../dtos/ICreateFieldJournal';

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

    public async all(
        orderBy: 'title' | 'created_at' | 'updated_at' = 'title',
        orderMethod: 'ASC' | 'DESC' = 'ASC',
        page = 1,
        limit = 5,
        search = '',
        relations: ['moderator' | 'eterapia'],
    ): Promise<FieldJournal[] | []> {
        const orderObject = this.createOrderObject(orderBy, orderMethod);

        const fieldJournal = await this.ormRepository.find({
            order: orderObject,
            take: limit,
            skip: (page - 1) * limit,
            where: [{ title: Like(`%${search}%`) }],
            relations,
        });

        return fieldJournal;
    }

    private createOrderObject(
        orderBy: 'title' | 'created_at' | 'updated_at',
        orderMethod: 'ASC' | 'DESC',
    ) {
        if (orderBy === 'title') {
            return { title: orderMethod };
        }
        if (orderBy === 'created_at') {
            return { created_at: orderMethod };
        }
        if (orderBy === 'updated_at') {
            return { created_at: orderMethod };
        }
        return undefined;
    }

    public async delete(fieldJournal: FieldJournal): Promise<void> {
        await this.ormRepository.remove(fieldJournal);
    }
}

export default FieldJournalRepository;
