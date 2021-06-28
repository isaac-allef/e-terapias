/* eslint-disable max-classes-per-file */
import UploadEtherapiesListService from '../../../src/core/services/UploadEtherapiesListService';
import UploadEtherapiesListRepository from '../../../src/core/protocols/db/repositories/UploadEtherapiesListRepository';
import { UploadEtherapiesListRepositoryStub } from '../mocks/mockEtherapy';
import { LoadOfferByIdRepositoryStub } from '../mocks/mockOffer';

interface SutTypes {
    sut: UploadEtherapiesListService;
    uploadEtherapiesListRepository: UploadEtherapiesListRepository;
}

const makeSut = (): SutTypes => {
    const uploadEtherapiesListRepository = new UploadEtherapiesListRepositoryStub();
    const loadOfferByIdRepository = new LoadOfferByIdRepositoryStub();
    const sut = new UploadEtherapiesListService(
        uploadEtherapiesListRepository,
        loadOfferByIdRepository,
    );
    return {
        sut,
        uploadEtherapiesListRepository,
    };
};

const fakeOffer = {
    id: 'fakeOfferId',
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

describe('Create Etherapy usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({
            offerId: 'fakeOfferId',
            etherapiesData: [
                { identifier: 'any_identifier', name: 'viver é bom' },
                { identifier: 'any_identifier', name: 'não desista' },
            ],
        });
        expect(executeSpy).toHaveBeenCalledWith({
            offerId: 'fakeOfferId',
            etherapiesData: [
                { identifier: 'any_identifier', name: 'viver é bom' },
                { identifier: 'any_identifier', name: 'não desista' },
            ],
        });
    });

    test('Should call UploadEtherapiesListRepository with correct values', async () => {
        const { sut, uploadEtherapiesListRepository } = makeSut();
        const createSpy = jest.spyOn(uploadEtherapiesListRepository, 'upload');
        await sut.execute({
            offerId: 'fakeOfferId',
            etherapiesData: [
                { identifier: 'any_identifier', name: 'viver é bom' },
                { identifier: 'any_identifier', name: 'não desista' },
            ],
        });
        expect(createSpy).toHaveBeenCalledWith({
            offer: fakeOffer,
            etherapiesData: [
                { identifier: 'any_identifier', name: 'viver é bom' },
                { identifier: 'any_identifier', name: 'não desista' },
            ],
        });
    });

    test('Should throw if UploadEtherapiesListRepository throws', async () => {
        const { sut, uploadEtherapiesListRepository } = makeSut();
        jest.spyOn(
            uploadEtherapiesListRepository,
            'upload',
        ).mockImplementationOnce(() => {
            throw new Error('Random error');
        });

        await expect(
            sut.execute({
                offerId: 'fakeOfferId',
                etherapiesData: [
                    { identifier: 'any_identifier', name: 'viver é bom' },
                    { identifier: 'any_identifier', name: 'não desista' },
                ],
            }),
        ).rejects.toThrow();
    });
});
