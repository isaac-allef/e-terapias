/* eslint-disable no-shadow */
import Offer, { settings } from '../entities/Offer';
import UpdateOfferRepository from '../protocols/db/repositories/UpdateOfferRepository';

export type params = {
    id: string;
    name: string;
    dateStart: Date;
    dateEnd: Date;
    settings: settings;
};

class UpdateOfferService {
    constructor(private updateOfferRepository: UpdateOfferRepository) {}

    public async execute({
        id,
        name,
        dateStart,
        dateEnd,
        settings,
    }: params): Promise<Offer> {
        return this.updateOfferRepository.update({
            id,
            name,
            dateStart,
            dateEnd,
            settings,
        });
    }
}

export default UpdateOfferService;
