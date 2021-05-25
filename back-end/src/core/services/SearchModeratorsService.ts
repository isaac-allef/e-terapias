import Moderator from '../entities/Moderator';
import SearchModeratorsRepository, {
    params,
} from '../protocols/db/repositories/SearchModeratorsRepository';

class SearchModeratorsService {
    constructor(
        private searchModeratorsRepository: SearchModeratorsRepository,
    ) {}

    public async execute({
        keywords,
        per_page = 10,
        page = 1,
    }: params): Promise<Moderator[]> {
        return this.searchModeratorsRepository.search({
            keywords,
            per_page,
            page,
        });
    }
}

export default SearchModeratorsService;
