import FieldJournal from '../../../../../core/entities/FieldJournal';
import Etherapy from '../../../../../core/entities/Etherapy';
import generateFakeId from './generateFakeId';
import Moderator from '../../../../../core/entities/Moderator';

class FieldJournalFake implements FieldJournal {
    constructor(name: string, fields: JSON) {
        this.id = generateFakeId();
        this.name = name;
        this.fields = fields;
    }

    id: string;

    name: string;

    moderator: Moderator;

    Etherapy: Etherapy;

    fields: JSON;
}

export default FieldJournalFake;
