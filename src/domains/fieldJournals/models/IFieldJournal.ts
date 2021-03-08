import Field from './IField';
import Eterapia from '../../../typeorm/entities/Eterapia';
import Moderator from '../../../typeorm/entities/Moderator';

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
