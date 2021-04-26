import FieldJournal, { field } from '../../../../../core/entities/FieldJournal';
import Etherapy from '../../../../../core/entities/Etherapy';
import generateFakeId from './generateFakeId';
import Moderator from '../../../../../core/entities/Moderator';

class FieldJournalFake implements FieldJournal {
    constructor(name: string, fields: field[]) {
        this.id = generateFakeId();
        this.name = name;
        this.fields = fields;
    }

    id: string;

    name: string;

    moderator: Moderator;

    Etherapy: Etherapy;

    fields: field[];
}

export default FieldJournalFake;
