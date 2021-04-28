import Moderator from '../../../../../core/entities/Moderator';
import FieldJournal from '../../../../../core/entities/FieldJournal';
import Etherapy from '../../../../../core/entities/Etherapy';
import generateFakeId from './generateFakeId';

class ModeratorFake implements Moderator {
    constructor(email: string, name: string) {
        this.id = generateFakeId();
        this.email = email;
        this.password = '1234';
        this.name = name;
        this.fieldJournals = [];
        this.etherapies = [];
    }

    id: string;

    email: string;

    password: string;

    token: string;

    name: string;

    fieldJournals: FieldJournal[];

    etherapies: Etherapy[];
}

export default ModeratorFake;
