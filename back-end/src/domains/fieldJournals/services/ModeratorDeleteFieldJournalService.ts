import AppError from '../../../shared/errors/AppError';
import IFieldJournal from '../models/IFieldJournal';
import IFieldJournalRepository from '../repositories/IFieldJournalRepository';

interface Request {
    id: string;
    moderatorId: string;
}

class ModeratorDeleteFieldJournalService {
    constructor(private fieldJournalRepository: IFieldJournalRepository) {}

    public async execute({ id, moderatorId }: Request): Promise<IFieldJournal> {
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
