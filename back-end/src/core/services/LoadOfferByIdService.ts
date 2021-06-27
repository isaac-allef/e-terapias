import Offer from '../entities/Offer';
import LoadOfferByIdRepository from '../protocols/db/repositories/LoadOfferByIdRepository';

class LoadOfferByIdService {
    constructor(private loadOfferByIdRepository: LoadOfferByIdRepository) {}

    public async execute(id: string): Promise<Offer> {
        return this.loadOfferByIdRepository.load(id);
    }
}

export default LoadOfferByIdService;
