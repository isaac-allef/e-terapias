// import ICreateField from './ICreateField';

import IEterapia from '../domains/eterapias/models/IEterapia';
import IModerator from '../domains/moderators/models/IModerator';

interface ICreateFieldJournal {
    title: string;
    // fields: ICreateField[];
    eterapia: IEterapia;
    moderator: IModerator;
}

export default ICreateFieldJournal;
