import Eterapia from './IEterapia';
import Field from './IField';
import Moderator from './IModerator';

interface IFieldJournal {
    id: string;

    title: string;

    moderator: Moderator;

    eterapia: Eterapia;

    fields: Field[];
}

export default IFieldJournal;
