import Etherapy from '../entities/Etherapy';
import LoadAllEtherapiesRepository, {
    params,
} from '../protocols/db/repositories/LoadAllEtherapiesRepository';

class LoadAllEtherapiesService {
    constructor(
        private loadAllEtherapiesRepository: LoadAllEtherapiesRepository,
    ) {}

    public async execute({
        offerId,
        sort = 'updated_at',
        direction = 'asc',
        per_page = 10,
        page = 1,
    }: params): Promise<Etherapy[]> {
        return this.loadAllEtherapiesRepository.loadAll({
            offerId,
            sort,
            direction,
            per_page,
            page,
        });
    }
}

export default LoadAllEtherapiesService;
