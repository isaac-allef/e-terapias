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
        per_page = 10,
        page = 1,
    }: params): Promise<FieldJournal[]> {
        return this.searchFieldJournalsPerModeratorRepository.searchPerModerator(
            {
                moderatorId,
                keywords,
                per_page,
                page,
            },
        );
    }
}

export default SearchFieldJournalsPerModeratorService;
