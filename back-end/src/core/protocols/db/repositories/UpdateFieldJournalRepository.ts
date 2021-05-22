import FieldJournal, { field } from '../../../entities/FieldJournal';

export type params = {
    id: string;
    name: string;
    date: Date;
    fields: field[];
};

export default interface UpdateFieldJournalRepository {
    update({ id, name, date, fields }: params): Promise<FieldJournal>;
}
