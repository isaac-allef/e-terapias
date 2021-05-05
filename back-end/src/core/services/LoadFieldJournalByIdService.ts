import FieldJournal from '../entities/FieldJournal';
import LoadFieldJournalByIdRepository from '../protocols/db/repositories/LoadFieldJournalByIdRepository';

class LoadFieldJournalByIdService {
    constructor(
        private loadFieldJournalByIdRepository: LoadFieldJournalByIdRepository,
    ) {}

    public async execute(id: string): Promise<FieldJournal> {
        return this.loadFieldJournalByIdRepository.load(id);
    }
}

export default LoadFieldJournalByIdService;
