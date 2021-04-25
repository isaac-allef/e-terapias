// import ICreateField from './ICreateField';

import Eterapia from '../../../entities/Eterapia';
import Moderator from '../../../entities/Moderator';

interface CreateFieldJournalDTO {
    title: string;
    // fields: ICreateField[];
    eterapia: Eterapia;
    moderator: Moderator;
}

export default CreateFieldJournalDTO;
