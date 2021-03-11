import IFieldJournal from '../../fieldJournals/models/IFieldJournal';
import IFieldJournalTemplate from '../../fieldJournals/models/IFieldJournalTemplate';

import IModerator from '../../moderators/models/IModerator';

interface IEterapia {
    id: string;

    name: string;

    fieldJournals: IFieldJournal[];

    fieldJournalTemplate: IFieldJournalTemplate;

    moderators: IModerator[];
}

export default IEterapia;
