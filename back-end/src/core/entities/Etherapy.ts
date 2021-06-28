import FieldJournal from './FieldJournal';
import Template from './Template';

import Moderator from './Moderator';
import Offer from './Offer';

interface Etherapy {
    id: string;

    identifier: string;

    name: string;

    fieldJournals: FieldJournal[];

    template: Template | null;

    moderators: Moderator[];

    offer: Offer;
}

export default Etherapy;
