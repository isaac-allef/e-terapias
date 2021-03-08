import FieldJournal from './IFieldJournal';
import FieldJournalTemplate from './IFieldJournalTemplate';

import Moderator from '../domains/moderators/models/IModerator';

interface IEterapia {
    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    fieldJournalTemplate: FieldJournalTemplate;

    moderators: Moderator[];
}

export default IEterapia;
