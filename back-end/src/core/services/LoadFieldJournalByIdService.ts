import FieldJournal from '../entities/FieldJournal';
import LoadFieldJournalByIdRepository from '../protocols/db/repositories/LoadFieldJournalByIdRepository';

class LoadFieldJournalByIdService {
    constructor(
        private loadFieldJournalByIdRepository: LoadFieldJournalByIdRepository,
    ) {}

    public async execute(
        id: string,
        verifyModeratorId: string | null = null,
    ): Promise<FieldJournal> {
        const fieldJournal = await this.loadFieldJournalByIdRepository.load(id);

        if (!verifyModeratorId) {
            return fieldJournal;
        }

        if (verifyModeratorId === fieldJournal.moderator.id) {
            return fieldJournal;
        }
        throw new Error("Moderator id doesn't match");
    }
}

export default LoadFieldJournalByIdService;
