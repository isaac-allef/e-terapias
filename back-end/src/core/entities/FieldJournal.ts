import Etherapy from './Etherapy';
import Moderator from './Moderator';

interface FieldJournal {
    id: string;

    name: string;

    moderator: Moderator;

    Etherapy: Etherapy;

    fields: JSON;
}

export default FieldJournal;
