import FieldJournal from '../entities/FieldJournal';
import SearchFieldJournalsRepository, {
    params,
} from '../protocols/db/repositories/SearchFieldJournalsRepository';

class SearchFieldJournalsService {
    constructor(
        private searchFieldJournalsRepository: SearchFieldJournalsRepository,
    ) {}

    public async execute({
        keywords,
        per_page = 10,
        page = 1,
    }: params): Promise<FieldJournal[]> {
        return this.searchFieldJournalsRepository.search({
            keywords,
            per_page,
            page,
        });
    }
}

export default SearchFieldJournalsService;
