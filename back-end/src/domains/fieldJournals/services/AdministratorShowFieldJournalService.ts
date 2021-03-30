import AppError from '../../../shared/errors/AppError';
import IRelationsFieldJournal from '../dtos/IRelationsFieldJournal';
import IFieldJournal from '../models/IFieldJournal';
import IFieldJournalRepository from '../repositories/IFieldJournalRepository';

interface Request extends IRelationsFieldJournal {
    id: string;
}

class AdministratorShowFieldJournalService {
    constructor(private fieldJournalRepository: IFieldJournalRepository) {}

    public async execute({ id, relations }: Request): Promise<IFieldJournal> {
        const fieldJournal = await this.fieldJournalRepository.findById({
            id,
            relations,
        });

        if (!fieldJournal) {
            throw new AppError('Field journal not found.');
        }

        return fieldJournal;
    }
}

export default AdministratorShowFieldJournalService;
