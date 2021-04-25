import Eterapia from './Eterapia';
import FieldJournal from './FieldJournal';

interface Moderator {
    id: string;

    email: string;

    password: string;

    fieldJournals: FieldJournal[];

    eterapias: Eterapia[];

    created_at: Date;

    update_at: Date;
}

export default Moderator;
