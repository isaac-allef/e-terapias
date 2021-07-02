/* eslint-disable no-shadow */
import Offer, { settings } from '../../../entities/Offer';

export type params = {
    name: string;
    dateStart: Date;
    dateEnd: Date;
    settings: settings;
};

export default interface CreateOfferRepository {
    create({ name, dateStart, dateEnd, settings }: params): Promise<Offer>;
}
