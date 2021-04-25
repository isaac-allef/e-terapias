import AppError from '../../errors/AppError';
import RelationsFieldJournalDTO from './dtos/RelationsFieldJournalDTO';
import FieldJournal from '../../entities/FieldJournal';
import FieldJournalRepository from '../../protocols/db/repositories/FieldJournalRepository';

interface Request extends RelationsFieldJournalDTO {
    id: string;
    moderatorId: string;
}

class ModeratorShowFieldJournalService {
    constructor(private fieldJournalRepository: FieldJournalRepository) {}

    public async execute({
        id,
        relations,
        moderatorId,
    }: Request): Promise<FieldJournal> {
        const fieldJournal = await this.fieldJournalRepository.findByIdFilterByModerator(
            {
                id,
                relations,
                moderatorId,
            },
        );

        if (!fieldJournal) {
            throw new AppError('Field journal not found.');
        }

        return fieldJournal;
    }
}

export default ModeratorShowFieldJournalService;
