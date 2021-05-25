import Etherapy from '../entities/Etherapy';
import SearchEtherapiesRepository, {
    params,
} from '../protocols/db/repositories/SearchEtherapiesRepository';

class SearchEtherapiesService {
    constructor(
        private searchEtherapiesRepository: SearchEtherapiesRepository,
    ) {}

    public async execute({
        keywords,
        per_page = 10,
        page = 1,
    }: params): Promise<Etherapy[]> {
        return this.searchEtherapiesRepository.search({
            keywords,
            per_page,
            page,
        });
    }
}

export default SearchEtherapiesService;
