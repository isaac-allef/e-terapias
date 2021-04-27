import Etherapy from '../../../../../core/entities/Etherapy';
import FieldJournal from '../../../../../core/entities/FieldJournal';
import Template from '../../../../../core/entities/Template';
import Moderator from '../../../../../core/entities/Moderator';
import generateFakeId from './generateFakeId';

class EtherapyFake implements Etherapy {
    constructor(name: string) {
        this.id = generateFakeId();
        this.name = name;
        this.fieldJournals = [];
        this.moderators = [];
    }

    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    template: Template;

    moderators: Moderator[];
}

export default EtherapyFake;
