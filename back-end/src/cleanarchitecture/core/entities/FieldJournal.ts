import Field from './Field';
import Eterapia from './Eterapia';
import Moderator from './Moderator';

interface FieldJournal {
    id: string;

    title: string;

    moderator: Moderator;

    eterapia: Eterapia;

    fields: Field[];

    created_at: Date;

    update_at: Date;
}

export default FieldJournal;
