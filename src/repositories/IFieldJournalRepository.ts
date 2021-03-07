import ICreateFieldJournal from '../dtos/ICreateFieldJournal';
import FieldJournal from '../typeorm/entities/FieldJournal';

export default interface IFieldJournalRepository {
    createWithoutSave(data: ICreateFieldJournal): FieldJournal;
    save(fieldJournal: FieldJournal): Promise<void>;
    findById(id: string): Promise<FieldJournal | undefined>;
    all(): Promise<FieldJournal[] | []>;
}
