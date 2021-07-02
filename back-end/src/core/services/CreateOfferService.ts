/* eslint-disable no-shadow */
import Offer, { settings } from '../entities/Offer';
import CreateOfferRepository from '../protocols/db/repositories/CreateOfferRepository';

export type params = {
    name: string;
    dateStart: Date;
    dateEnd: Date;
    settings: settings;
};

class CreateOfferService {
    constructor(private createOfferRepository: CreateOfferRepository) {}

    public async execute({
        name,
        dateStart,
        dateEnd,
        settings,
    }: params): Promise<Offer> {
        return this.createOfferRepository.create({
            name,
            dateStart,
            dateEnd,
            settings,
        });
    }
}

export default CreateOfferService;
