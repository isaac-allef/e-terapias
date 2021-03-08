import Eterapia from '../../../models/IEterapia';
import FieldJournal from '../../../models/IFieldJournal';

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
