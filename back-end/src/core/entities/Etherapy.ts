import FieldJournal from './FieldJournal';
import Template from './Template';

import Moderator from './Moderator';

interface Etherapy {
    id: string;

    identifier: string;

    name: string;

    fieldJournals: FieldJournal[];

    template: Template | null;

    moderators: Moderator[];
}

export default Etherapy;
