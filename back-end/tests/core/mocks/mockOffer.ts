/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import LoadOfferByIdRepository from '../../../src/core/protocols/db/repositories/LoadOfferByIdRepository';
import Offer from '../../../src/core/entities/Offer';

export class LoadOfferByIdRepositoryStub implements LoadOfferByIdRepository {
    async load(id: string): Promise<Offer> {
        const offer: Offer = {
            id,
            name: 'fakeOffer',
            dateStart: new Date('2021-06-28'),
            dateEnd: new Date('2021-06-28'),
            etherapies: [],
            managers: [],
            settings: {
                serviceAccount: {
                    client_email: '',
                    private_key: '',
                },
                moderators: {
                    sheet_link: '',
                    column_email: '',
                    column_name: '',
                    column_etherapies_identifiers: '',
                },
                etherapies: {
                    sheet_link: '',
                    column_identifier: '',
                    column_name: '',
                },
            },
        };

        return new Promise(resolve => resolve(offer));
    }
}
