import Moderator from '../../../../../core/entities/Moderator';
import FieldJournal from '../../../../../core/entities/FieldJournal';
import Etherapy from '../../../../../core/entities/Etherapy';
import generateFakeId from './generateFakeId';

class ModeratorFake implements Moderator {
    constructor(name: string) {
        this.id = generateFakeId();
        this.name = name;
    }

    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    etherapies: Etherapy[];
}

export default ModeratorFake;
