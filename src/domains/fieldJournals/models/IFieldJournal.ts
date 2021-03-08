import Field from './IField';
import Eterapia from '../../eterapias/infra/typeorm/entities/Eterapia';
import Moderator from '../../moderators/infra/typeorm/entities/Moderator';

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
