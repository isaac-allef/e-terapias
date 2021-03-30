import ICreateFieldJournal from '../dtos/ICreateFieldJournal';
import IFindByIdFieldJournal from '../dtos/IFindByIdFieldJournal';
import IFindByIdFieldJournalFilterByModerator from '../dtos/IFindByIdFieldJournalFilterByModerator';
import IListFieldJournals from '../dtos/IListFieldJournals';
import IListFieldJournalsFilterByModerator from '../dtos/IListFieldJournalsFilterByModerator';
import IFieldJournal from '../models/IFieldJournal';

export default interface IFieldJournalRepository {
    createWithoutSave(data: ICreateFieldJournal): IFieldJournal;
    save(fieldJournal: IFieldJournal): Promise<void>;
    findById(data: IFindByIdFieldJournal): Promise<IFieldJournal | undefined>;
    all(data: IListFieldJournals): Promise<IFieldJournal[] | []>;
    delete(fieldJournal: IFieldJournal): Promise<void>;
    findByIdFilterByModerator(
        data: IFindByIdFieldJournalFilterByModerator,
    ): Promise<IFieldJournal | undefined>;
    allFilterByModerator(
        data: IListFieldJournalsFilterByModerator,
    ): Promise<IFieldJournal[] | []>;
}
