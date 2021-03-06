import FieldJournal from './IFieldJournal';
import FieldJournalTemplate from './IFieldJournalTemplate';

import Moderator from './IModerator';

interface EterapiaModel {
    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    fieldJournalTemplate: FieldJournalTemplate;

    moderators: Moderator[];
}

export default EterapiaModel;
