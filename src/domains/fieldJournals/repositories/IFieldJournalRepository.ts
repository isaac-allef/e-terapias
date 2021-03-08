import ICreateFieldJournal from '../dtos/ICreateFieldJournal';
import IFieldJournal from '../models/IFieldJournal';

export default interface IFieldJournalRepository {
    createWithoutSave(data: ICreateFieldJournal): IFieldJournal;
    save(fieldJournal: IFieldJournal): Promise<void>;
    findById(id: string): Promise<IFieldJournal | undefined>;
    all(): Promise<IFieldJournal[] | []>;
}
