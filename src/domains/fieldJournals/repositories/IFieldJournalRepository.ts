import ICreateFieldJournal from '../dtos/ICreateFieldJournal';
import IFieldJournal from '../models/IFieldJournal';

export default interface IFieldJournalRepository {
    createWithoutSave(data: ICreateFieldJournal): IFieldJournal;
    save(fieldJournal: IFieldJournal): Promise<void>;
    findById(
        id: string,
        relations?: ['moderator' | 'eterapia'],
    ): Promise<IFieldJournal | undefined>;
    all(
        orderBy: 'title' | 'created_at' | 'updated_at',
        orderMethod: 'ASC' | 'DESC',
        page: number,
        limit: number,
        search: string,
        relations: ['moderator' | 'eterapia'],
    ): Promise<IFieldJournal[] | []>;
    delete(fieldJournal: IFieldJournal): Promise<void>;
    findByIdFilterByModerator(
        id: string,
        relations?: ['moderator' | 'eterapia'],
        moderatorId?: string,
    ): Promise<IFieldJournal | undefined>;
    allFilterByModerator(
        orderBy: 'title' | 'created_at' | 'updated_at',
        orderMethod: 'ASC' | 'DESC',
        page: number,
        limit: number,
        search: string,
        relations: ['moderator' | 'eterapia'],
        moderatorId?: string,
    ): Promise<IFieldJournal[] | []>;
}
