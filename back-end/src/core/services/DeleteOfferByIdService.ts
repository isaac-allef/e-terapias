import DeleteOfferByIdRepository from '../protocols/db/repositories/DeleteOfferByIdRepository';

class DeleteOfferByIdService {
    constructor(private deleteOfferByIdRepository: DeleteOfferByIdRepository) {}

    public async execute(id: string): Promise<string> {
        await this.deleteOfferByIdRepository.delete(id);

        return 'Offer deleted';
    }
}

export default DeleteOfferByIdService;
