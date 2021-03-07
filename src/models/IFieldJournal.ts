import Eterapia from './IEterapia';
import Field from './IField';
import Moderator from './IModerator';

interface IFieldJournal {
    id: string;

    title: string;

    moderator: Moderator;

    eterapia: Eterapia;

    fields: Field[];

    created_at: Date;

    update_at: Date;
}

export default IFieldJournal;
