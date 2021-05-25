import Template from '../entities/Template';
import SearchTemplatesRepository, {
    params,
} from '../protocols/db/repositories/SearchTemplatesRepository';

class SearchTemplatesService {
    constructor(private searchTemplatesRepository: SearchTemplatesRepository) {}

    public async execute({
        keywords,
        per_page = 10,
        page = 1,
    }: params): Promise<Template[]> {
        return this.searchTemplatesRepository.search({
            keywords,
            per_page,
            page,
        });
    }
}

export default SearchTemplatesService;
