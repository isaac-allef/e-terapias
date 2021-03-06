import Eterapia from './IEterapia';
import FieldJournal from './IFieldJournal';

interface IModerator {
    id: string;

    email: string;

    password: string;

    fieldJournals: FieldJournal[];

    eterapias: Eterapia[];
}

export default IModerator;
