import Eterapia from '../../eterapias/models/IEterapia';
import IFieldJournal from '../../fieldJournals/models/IFieldJournal';

interface IModerator {
    id: string;

    email: string;

    password: string;

    fieldJournals: IFieldJournal[];

    eterapias: Eterapia[];

    created_at: Date;

    update_at: Date;
}

export default IModerator;
