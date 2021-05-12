import FieldJournal from '../entities/FieldJournal';
import SearchFieldJournalsRepository from '../protocols/db/repositories/SearchFieldJournalsRepository';

class SearchFieldJournalsService {
    constructor(
        private searchFieldJournalsRepository: SearchFieldJournalsRepository,
    ) {}

    public async execute(keywords: string): Promise<FieldJournal[]> {
        return this.searchFieldJournalsRepository.search(keywords);
    }
}

export default SearchFieldJournalsService;
