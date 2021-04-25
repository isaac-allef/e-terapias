import FieldJournal from './FieldJournal';
import FieldJournalTemplate from './FieldJournalTemplate';

import Moderator from './Moderator';

interface Eterapia {
    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    fieldJournalTemplate: FieldJournalTemplate;

    moderators: Moderator[];
}

export default Eterapia;
