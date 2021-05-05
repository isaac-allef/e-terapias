import Etherapy from '../entities/Etherapy';
import SearchEtherapiesRepository from '../protocols/db/repositories/SearchEtherapiesRepository';

class SearchEtherapiesService {
    constructor(
        private searchEtherapiesRepository: SearchEtherapiesRepository,
    ) {}

    public async execute(keywords: string): Promise<Etherapy[]> {
        return this.searchEtherapiesRepository.search(keywords);
    }
}

export default SearchEtherapiesService;
