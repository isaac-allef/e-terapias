import AppError from '../../../shared/errors/AppError';
import IFieldJournal from '../models/IFieldJournal';
import IFieldJournalRepository from '../repositories/IFieldJournalRepository';

interface Request {
    id: string;
}

class AdministratorDeleteFieldJournalService {
    constructor(private fieldJournalRepository: IFieldJournalRepository) {}

    public async execute({ id }: Request): Promise<IFieldJournal> {
        const fieldJournal = await this.fieldJournalRepository.findById({ id });

        if (!fieldJournal) {
            throw new AppError('Field journal not found.');
        }

        await this.fieldJournalRepository.delete(fieldJournal);

        return fieldJournal;
    }
}

export default AdministratorDeleteFieldJournalService;
