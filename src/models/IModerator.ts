import Eterapia from './IEterapia';
import FieldJournal from './IFieldJournal';

interface IModerator {
    id: string;

    email: string;

    password: string;

    fieldJournals: FieldJournal[];

    eterapias: Eterapia[];

    created_at: Date;

    update_at: Date;
}

export default IModerator;
