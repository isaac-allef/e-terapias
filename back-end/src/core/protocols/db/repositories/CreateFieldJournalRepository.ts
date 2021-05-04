import Etherapy from '../../../entities/Etherapy';
import FieldJournal, { field } from '../../../entities/FieldJournal';
import Moderator from '../../../entities/Moderator';

export type params = {
    name: string;
    fields: field[];
    moderator: Moderator;
    etherapy: Etherapy;
};

export default interface CreateFieldJournalRepository {
    create({
        name,
        fields,
        moderator,
        etherapy,
    }: params): Promise<FieldJournal>;
}
