import Offer from '../../../entities/Offer';

export default interface LoadOfferByIdRepository {
    load(id: string): Promise<Offer>;
}
