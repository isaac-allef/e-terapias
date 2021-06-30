import Offer from '../entities/Offer';
import LoadAllOffersRepository, {
    params,
} from '../protocols/db/repositories/LoadAllOffersRepository';

class LoadAllOffersService {
    constructor(private loadAllOffersRepository: LoadAllOffersRepository) {}

    public async execute({
        sort = 'updated_at',
        direction = 'asc',
        per_page = 10,
        page = 1,
    }: params): Promise<Offer[]> {
        return this.loadAllOffersRepository.loadAll({
            sort,
            direction,
            per_page,
            page,
        });
    }
}

export default LoadAllOffersService;
