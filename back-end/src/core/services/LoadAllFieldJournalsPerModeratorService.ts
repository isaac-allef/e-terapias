import FieldJournal from '../entities/FieldJournal';
import LoadAllFieldJournalsPerModeratorRepository, {
    params,
} from '../protocols/db/repositories/LoadAllFieldJournalsPerModeratorRepository';

class LoadAllFieldJournalsPerModeratorService {
    constructor(
        private loadAllEtherapiesRepository: LoadAllFieldJournalsPerModeratorRepository,
    ) {}

    public async execute({
        moderatorId,
        sort = 'updated_at',
        direction = 'asc',
        per_page = 10,
        page = 1,
    }: params): Promise<FieldJournal[]> {
        return this.loadAllEtherapiesRepository.loadAllPerModerator({
            moderatorId,
            sort,
            direction,
            per_page,
            page,
        });
    }
}

export default LoadAllFieldJournalsPerModeratorService;
