import { EntityRepository, getRepository, ILike, Repository } from 'typeorm';
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
        page = 1,
        limit = 5,
        search = '',
        relations,
    }: IListFieldJournals): Promise<FieldJournal[] | []> {
        const orderObject = this.createOrderObject(orderBy, orderMethod);

        const fieldJournal = await this.ormRepository.find({
            order: orderObject,
            take: limit,
            skip: (page - 1) * limit,
            where: [{ title: ILike(`%${search}%`) }],
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

    public async allFilterByModerator({
        orderBy,
        orderMethod,
        page = 1,
        limit = 5,
        search = '',
        relations,
        moderatorId,
    }: IListFieldJournalsFilterByModerator): Promise<FieldJournal[] | []> {
        const orderObject = this.createOrderObject(orderBy, orderMethod);

        const fieldJournal = await this.ormRepository.find({
            order: orderObject,
            take: limit,
            skip: (page - 1) * limit,
            where: [
                { title: ILike(`%${search}%`), moderator: { id: moderatorId } },
            ],
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
}

export default FieldJournalRepository;
