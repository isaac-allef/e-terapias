import AppError from '../../errors/AppError';
import FieldJournal from '../../entities/FieldJournal';
import FieldJournalRepository from '../../protocols/db/repositories/FieldJournalRepository';

interface Request {
    id: string;
}

class AdministratorDeleteFieldJournalService {
    constructor(private fieldJournalRepository: FieldJournalRepository) {}

    public async execute({ id }: Request): Promise<FieldJournal> {
        const fieldJournal = await this.fieldJournalRepository.findById({ id });

        if (!fieldJournal) {
            throw new AppError('Field journal not found.');
        }

        await this.fieldJournalRepository.delete(fieldJournal);

        return fieldJournal;
    }
}

export default AdministratorDeleteFieldJournalService;
