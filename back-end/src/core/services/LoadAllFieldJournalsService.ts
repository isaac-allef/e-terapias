import FieldJournal from '../entities/FieldJournal';
import LoadAllFieldJournalsRepository, {
    params,
} from '../protocols/db/repositories/LoadAllFieldJournalsRepository';

class LoadAllFieldJournalsService {
    constructor(
        private loadAllFieldJournalsRepository: LoadAllFieldJournalsRepository,
    ) {}

    public async execute({
        sort = 'updated_at',
        direction = 'asc',
        per_page = 10,
        page = 1,
    }: params): Promise<FieldJournal[]> {
        return this.loadAllFieldJournalsRepository.loadAll({
            sort,
            direction,
            per_page,
            page,
        });
    }
}

export default LoadAllFieldJournalsService;
