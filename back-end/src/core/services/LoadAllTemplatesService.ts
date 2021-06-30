import Template from '../entities/Template';
import LoadAllTemplatesRepository, {
    params,
} from '../protocols/db/repositories/LoadAllTemplatesRepository';

class LoadAllTemplatesService {
    constructor(
        private loadAllTemplatesRepository: LoadAllTemplatesRepository,
    ) {}

    public async execute({
        offerId,
        sort = 'updated_at',
        direction = 'asc',
        per_page = 10,
        page = 1,
    }: params): Promise<Template[]> {
        return this.loadAllTemplatesRepository.loadAll({
            offerId,
            sort,
            direction,
            per_page,
            page,
        });
    }
}

export default LoadAllTemplatesService;
