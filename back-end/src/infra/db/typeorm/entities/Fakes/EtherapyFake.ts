import Etherapy from '../../../../../core/entities/Etherapy';
import FieldJournal from '../../../../../core/entities/FieldJournal';
import FieldJournalTemplate from '../../../../../core/entities/FieldJournalTemplate';
import Moderator from '../../../../../core/entities/Moderator';

class EtherapyFake implements Etherapy {
    constructor(name: string) {
        this.id =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        this.name = name;
    }

    id: string;

    name: string;

    fieldJournals: FieldJournal[];

    fieldJournalTemplate: FieldJournalTemplate;

    moderators: Moderator[];
}

export default EtherapyFake;
