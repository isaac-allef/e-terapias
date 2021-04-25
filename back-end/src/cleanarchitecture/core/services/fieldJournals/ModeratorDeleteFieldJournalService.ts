import AppError from '../../errors/AppError';
import FieldJournal from '../../entities/FieldJournal';
import FieldJournalRepository from '../../protocols/db/repositories/FieldJournalRepository';

interface Request {
    id: string;
    moderatorId: string;
}

class ModeratorDeleteFieldJournalService {
    constructor(private fieldJournalRepository: FieldJournalRepository) {}

    public async execute({ id, moderatorId }: Request): Promise<FieldJournal> {
        const fieldJournal = await this.fieldJournalRepository.findById({
            id,
            relations: ['moderator'],
        });

        if (!fieldJournal) {
            throw new AppError('Field journal not found.');
        }

        if (moderatorId !== fieldJournal.moderator.id) {
            throw new AppError(
                "You cannot delete another moderator's field journal",
            );
        }

        await this.fieldJournalRepository.delete(fieldJournal);

        return fieldJournal;
    }
}

export default ModeratorDeleteFieldJournalService;
