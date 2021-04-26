import Etherapy from './Etherapy';
import Moderator from './Moderator';

export type field = {
    name: string;
    value: string;
};

interface FieldJournal {
    id: string;

    name: string;

    moderator: Moderator;

    Etherapy: Etherapy;

    fields: field[];
}

export default FieldJournal;
