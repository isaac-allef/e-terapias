import Eterapia from '../typeorm/entities/Eterapia';
import Moderator from '../typeorm/entities/Moderator';
// import ICreateField from './ICreateField';

interface ICreateFieldJournal {
    title: string;
    // fields: ICreateField[];
    eterapia: Eterapia;
    moderator: Moderator;
}

export default ICreateFieldJournal;
