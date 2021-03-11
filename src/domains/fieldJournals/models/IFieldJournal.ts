import Field from './IField';
import IEterapia from '../../eterapias/models/IEterapia';
import IModerator from '../../moderators/models/IModerator';

interface IFieldJournal {
    id: string;

    title: string;

    moderator: IModerator;

    eterapia: IEterapia;

    fields: Field[];

    created_at: Date;

    update_at: Date;
}

export default IFieldJournal;
