import Etherapy from './Etherapy';
import FieldJournal from './FieldJournal';

interface Moderator {
    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    etherapies: Etherapy[];
}

export default Moderator;
