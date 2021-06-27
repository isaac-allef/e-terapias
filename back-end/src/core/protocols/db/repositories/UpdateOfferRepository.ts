/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
// import Manager from '../../../entities/Manager';
import Offer, { settings } from '../../../entities/Offer';

export type params = {
    id: string;
    name: string;
    dateStart: Date;
    dateEnd: Date;
    settings: settings;
    // supervisor: Manager;
};

export default interface UpdateOfferRepository {
    update({
        id,
        name,
        dateStart,
        dateEnd,
        settings,
        // supervisor,
    }: params): Promise<Offer>;
}
