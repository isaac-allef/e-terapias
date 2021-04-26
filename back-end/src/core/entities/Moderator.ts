import Etherapy from './Etherapy';
import FieldJournal from './FieldJournal';

interface Moderator {
    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    Etherapies: Etherapy[];
}

export default Moderator;
