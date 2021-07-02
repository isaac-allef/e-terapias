/* eslint-disable no-shadow */
import Offer, { settings } from '../../../entities/Offer';

export type params = {
    id: string;
    name: string;
    dateStart: Date;
    dateEnd: Date;
    settings: settings;
};

export default interface UpdateOfferRepository {
    update({ id, name, dateStart, dateEnd, settings }: params): Promise<Offer>;
}
