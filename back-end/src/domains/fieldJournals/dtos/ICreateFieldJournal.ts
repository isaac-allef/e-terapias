// import ICreateField from './ICreateField';

import IEterapia from '../../eterapias/models/IEterapia';
import IModerator from '../../moderators/models/IModerator';

interface ICreateFieldJournal {
    title: string;
    // fields: ICreateField[];
    eterapia: IEterapia;
    moderator: IModerator;
}

export default ICreateFieldJournal;
