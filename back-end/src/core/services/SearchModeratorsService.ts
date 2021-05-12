import Moderator from '../entities/Moderator';
import SearchModeratorsRepository from '../protocols/db/repositories/SearchModeratorsRepository';

class SearchModeratorsService {
    constructor(
        private searchModeratorsRepository: SearchModeratorsRepository,
    ) {}

    public async execute(keywords: string): Promise<Moderator[]> {
        return this.searchModeratorsRepository.search(keywords);
    }
}

export default SearchModeratorsService;
