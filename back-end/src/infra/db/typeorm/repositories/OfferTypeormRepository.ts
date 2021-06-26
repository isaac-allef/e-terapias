import { EntityRepository, getRepository, Repository } from 'typeorm';
import Offer from '../../../../core/entities/Offer';
import CreateOfferRepository, {
    params,
} from '../../../../core/protocols/db/repositories/CreateOfferRepository';
import OfferTypeorm from '../entities/OfferTypeorm';

@EntityRepository()
class OfferTypeormRepository implements CreateOfferRepository {
    private ormRepository: Repository<OfferTypeorm>;

    constructor() {
        this.ormRepository = getRepository(OfferTypeorm);
    }

    public async create({
        name,
        dateStart,
        dateEnd,
        settings,
    }: params): Promise<Offer> {
        try {
            const offer = this.ormRepository.create({
                name,
                dateStart,
                dateEnd,
                settings,
            });

            await this.ormRepository.save(offer);

            return offer;
        } catch {
            throw new Error('Create offer error');
        }
    }
}

export default OfferTypeormRepository;
