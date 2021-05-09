import FieldJournal from '../entities/FieldJournal';
import SearchFieldJournalsPerModeratorRepository, {
    params,
} from '../protocols/db/repositories/SearchFieldJournalsPerModeratorRepository';

class SearchFieldJournalsPerModeratorService {
    constructor(
        private searchFieldJournalsPerModeratorRepository: SearchFieldJournalsPerModeratorRepository,
    ) {}

    public async execute({
        moderatorId,
        keywords,
    }: params): Promise<FieldJournal[]> {
        return this.searchFieldJournalsPerModeratorRepository.searchPerModerator(
            {
                moderatorId,
                keywords,
            },
        );
    }
}

export default SearchFieldJournalsPerModeratorService;
