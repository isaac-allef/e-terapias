import Moderator from '../entities/Moderator';
import LoadAllModeratorsRepository, {
    params,
} from '../protocols/db/repositories/LoadAllModeratorsRepository';

class LoadAllModeratorsService {
    constructor(
        private loadAllModeratorsRepository: LoadAllModeratorsRepository,
    ) {}

    public async execute({
        sort = 'updated_at',
        direction = 'asc',
        per_page = 10,
        page = 1,
    }: params): Promise<Moderator[]> {
        return this.loadAllModeratorsRepository.loadAll({
            sort,
            direction,
            per_page,
            page,
        });
    }
}

export default LoadAllModeratorsService;
