import Field from './Field';
import Etherapy from './Etherapy';
import Moderator from './Moderator';

interface FieldJournal {
    id: string;

    title: string;

    moderator: Moderator;

    Etherapy: Etherapy;

    fields: Field[];
}

export default FieldJournal;
