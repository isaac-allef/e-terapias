import Etherapy from './Etherapy';
import FieldJournal from './FieldJournal';
import User from './User';

interface Moderator extends User {
    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    etherapies: Etherapy[];
}

export default Moderator;
