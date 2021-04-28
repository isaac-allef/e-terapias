import FieldJournal from './FieldJournal';
import Template from './Template';

import Moderator from './Moderator';

interface Etherapy {
    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    template: Template | undefined;

    moderators: Moderator[];
}

export default Etherapy;
