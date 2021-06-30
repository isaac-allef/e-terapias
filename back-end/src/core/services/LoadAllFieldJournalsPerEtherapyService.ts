import FieldJournal from '../entities/FieldJournal';
import LoadAllFieldJournalsPerEtherapyRepository, {
    params,
} from '../protocols/db/repositories/LoadAllFieldJournalsPerEtherapyRepository';

class LoadAllFieldJournalsPerEtherapyService {
    constructor(
        private loadAllEtherapiesRepository: LoadAllFieldJournalsPerEtherapyRepository,
    ) {}

    public async execute({
        offerId,
        etherapyId,
        sort = 'updated_at',
        direction = 'asc',
        per_page = 10,
        page = 1,
    }: params): Promise<FieldJournal[]> {
        return this.loadAllEtherapiesRepository.loadAllPerEtherapy({
            offerId,
            etherapyId,
            sort,
            direction,
            per_page,
            page,
        });
    }
}

export default LoadAllFieldJournalsPerEtherapyService;
