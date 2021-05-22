import FieldJournal, { field } from '../entities/FieldJournal';
import UpdateFieldJournalRepository from '../protocols/db/repositories/UpdateFieldJournalRepository';
import LoadFieldJournalByIdRepository from '../protocols/db/repositories/LoadFieldJournalByIdRepository';
import LoadModeratorByIdRepository from '../protocols/db/repositories/LoadModeratorByIdRepository';

export type params = {
    id: string;
    name: string;
    date: Date;
    fields: field[];
    moderatorId: string;
};

class UpdateFieldJournalService {
    constructor(
        private updateFieldJournalRepository: UpdateFieldJournalRepository,
        private loadModeratorByIdRepository: LoadModeratorByIdRepository,
        private loadFieldJournalByIdRepository: LoadFieldJournalByIdRepository,
    ) {}

    public async execute({
        id,
        name,
        date,
        fields,
        moderatorId,
    }: params): Promise<FieldJournal> {
        const moderator = await this.loadModeratorByIdRepository.load(
            moderatorId,
        );

        const fieldJournal = await this.loadFieldJournalByIdRepository.load(id);

        if (fieldJournal.moderator.id !== moderatorId) {
            throw new Error(
                'This field journal does not be related with this moderator',
            );
        }

        if (
            !moderator.etherapies.find(e => e.id === fieldJournal.etherapy.id)
        ) {
            throw new Error(
                'This moderator is not related to the etherapy of this field journal',
            );
        }

        const oldFields = fieldJournal.fields;

        if (!this.matchFieldsWithOldFields(oldFields, fields)) {
            throw new Error("This new fields doesn't match the old fields");
        }

        const fieldJournalUpdated = await this.updateFieldJournalRepository.update(
            {
                id,
                name,
                date,
                fields,
            },
        );

        return fieldJournalUpdated;
    }

    private matchFieldsWithOldFields(
        oldFields: field[],
        fields: field[],
    ): boolean {
        const countOldFeilds = oldFields.length;
        const countFields = fields.length;

        if (countOldFeilds !== countFields) {
            return false;
        }

        // eslint-disable-next-line
        for (let i = 0; i < countOldFeilds; i++) {
            if (
                oldFields[i].name !== fields[i].name ||
                oldFields[i].type !== fields[i].type
            ) {
                return false;
            }
        }

        return true;
    }
}

export default UpdateFieldJournalService;
