import Etherapy from './Etherapy';
import Moderator from './Moderator';

export type field = {
    name: string;
    type:
        | 'short'
        | 'long'
        | 'date'
        | 'choice'
        | 'check'
        | 'dropdown'
        | 'linear';
    options?: string[];
    value: string | string[] | Date;
};

interface FieldJournal {
    id: string;

    name: string;

    date: Date;

    moderator: Moderator;

    etherapy: Etherapy;

    fields: field[];
}

export default FieldJournal;
