import FieldJournal, { field } from '../../../../../core/entities/FieldJournal';
import Etherapy from '../../../../../core/entities/Etherapy';
import generateFakeId from './generateFakeId';
import Moderator from '../../../../../core/entities/Moderator';

class FieldJournalFake implements FieldJournal {
    constructor(
        name: string,
        fields: field[],
        moderator: Moderator,
        etherapy: Etherapy,
    ) {
        this.id = generateFakeId();
        this.name = name;
        this.fields = fields;
        this.moderator = moderator;
        this.etherapy = etherapy;
    }

    id: string;

    name: string;

    moderator: Moderator;

    etherapy: Etherapy;

    fields: field[];
}

export default FieldJournalFake;
