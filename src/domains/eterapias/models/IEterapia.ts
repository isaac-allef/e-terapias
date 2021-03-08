import FieldJournal from '../../../models/IFieldJournal';
import FieldJournalTemplate from '../../../models/IFieldJournalTemplate';

import Moderator from '../../moderators/models/IModerator';

interface IEterapia {
    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    fieldJournalTemplate: FieldJournalTemplate;

    moderators: Moderator[];
}

export default IEterapia;
