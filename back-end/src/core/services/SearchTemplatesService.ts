import Template from '../entities/Template';
import SearchTemplatesRepository from '../protocols/db/repositories/SearchTemplatesRepository';

class SearchTemplatesService {
    constructor(private searchTemplatesRepository: SearchTemplatesRepository) {}

    public async execute(keywords: string): Promise<Template[]> {
        return this.searchTemplatesRepository.search(keywords);
    }
}

export default SearchTemplatesService;
