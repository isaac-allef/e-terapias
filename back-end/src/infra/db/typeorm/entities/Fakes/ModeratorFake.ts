import Moderator from '../../../../../core/entities/Moderator';
import FieldJournal from '../../../../../core/entities/FieldJournal';
import Etherapy from '../../../../../core/entities/Etherapy';

class ModeratorFake implements Moderator {
    constructor(name: string) {
        this.id =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        this.name = name;
    }

    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    Etherapies: Etherapy[];
}

export default ModeratorFake;
