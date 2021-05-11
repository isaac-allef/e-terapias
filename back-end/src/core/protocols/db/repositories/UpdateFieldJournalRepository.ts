import FieldJournal, { field } from '../../../entities/FieldJournal';

export type params = {
    id: string;
    name: string;
    fields: field[];
};

export default interface UpdateFieldJournalRepository {
    update({ id, name, fields }: params): Promise<FieldJournal>;
}
