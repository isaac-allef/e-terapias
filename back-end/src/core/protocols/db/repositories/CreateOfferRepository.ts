/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
// import Manager from '../../../entities/Manager';
import Offer, { settings } from '../../../entities/Offer';

export type params = {
    name: string;
    dateStart: Date;
    dateEnd: Date;
    settings: settings;
    // supervisor: Manager;
};

export default interface CreateOfferRepository {
    create({
        name,
        dateStart,
        dateEnd,
        settings,
        // supervisor,
    }: params): Promise<Offer>;
}
