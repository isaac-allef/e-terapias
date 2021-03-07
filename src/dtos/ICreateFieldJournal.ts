// import ICreateField from './ICreateField';

import IEterapia from '../models/IEterapia';
import IModerator from '../models/IModerator';

interface ICreateFieldJournal {
    title: string;
    // fields: ICreateField[];
    eterapia: IEterapia;
    moderator: IModerator;
}

export default ICreateFieldJournal;
