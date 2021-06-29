/* eslint-disable max-classes-per-file */
import UploadModeratorsListService from '../../../src/core/services/UploadModeratorsListService';
import UploadModeratorsListRepository from '../../../src/core/protocols/db/repositories/UploadModeratorsListRepository';
import HashGenerater from '../../../src/core/protocols/cryptography/HashGenerater';
import { UploadModeratorsListRepositoryStub } from '../mocks/mockModerator';
import { LoadManyEtherapiesByIdentifiersRepositoryStub } from '../mocks/mockEtherapy';
import { HashGeneraterStub } from '../mocks/mockCryptography';
import LoadManyEtherapiesByIdentifierRepository from '../../../src/core/protocols/db/repositories/LoadManyEtherapiesByIdentifierRepository';
import { LoadOfferByIdRepositoryStub } from '../mocks/mockOffer';

interface SutTypes {
    sut: UploadModeratorsListService;
    hashGenerater: HashGenerater;
    uploadModeratorsListRepository: UploadModeratorsListRepository;
    loadManyEtherapiesByIdentifierRepository: LoadManyEtherapiesByIdentifierRepository;
}

const makeSut = (): SutTypes => {
    const hashGenerater = new HashGeneraterStub();
    const uploadModeratorsListRepository = new UploadModeratorsListRepositoryStub();
    const loadManyEtherapiesByIdentifierRepository = new LoadManyEtherapiesByIdentifiersRepositoryStub();
    const loadOfferByIdRepository = new LoadOfferByIdRepositoryStub();
    const sut = new UploadModeratorsListService(
        hashGenerater,
        uploadModeratorsListRepository,
        loadManyEtherapiesByIdentifierRepository,
        loadOfferByIdRepository,
    );
    return {
        sut,
        hashGenerater,
        uploadModeratorsListRepository,
        loadManyEtherapiesByIdentifierRepository,
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

describe('Create Moderator usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({
            offerId: 'fakeOfferId',
            moderatorsData: [
                {
                    email: 'fulano@email.com',
                    name: 'fulano',
                    etherapiesIdentifiers: [],
                },
                {
                    email: 'sicrano@email.com',
                    name: 'sicrano',
                    etherapiesIdentifiers: [],
                },
            ],
        });
        expect(executeSpy).toHaveBeenCalledWith({
            offerId: 'fakeOfferId',
            moderatorsData: [
                {
                    email: 'fulano@email.com',
                    name: 'fulano',
                    etherapiesIdentifiers: [],
                },
                {
                    email: 'sicrano@email.com',
                    name: 'sicrano',
                    etherapiesIdentifiers: [],
                },
            ],
        });
    });

    test('Should call CreateModeratorRepository with correct values', async () => {
        const { sut, uploadModeratorsListRepository } = makeSut();
        const createSpy = jest.spyOn(uploadModeratorsListRepository, 'upload');
        await sut.execute({
            offerId: 'fakeOfferId',
            moderatorsData: [
                {
                    email: 'fulano@email.com',
                    name: 'fulano',
                    etherapiesIdentifiers: [],
                },
                {
                    email: 'sicrano@email.com',
                    name: 'sicrano',
                    etherapiesIdentifiers: [],
                },
            ],
        });
        expect(createSpy).toHaveBeenCalledWith({
            offer: fakeOffer,
            moderatorsData: [
                {
                    email: 'fulano@email.com',
                    name: 'fulano',
                    password: expect.stringMatching('.'),
                    etherapies: [],
                },
                {
                    email: 'sicrano@email.com',
                    name: 'sicrano',
                    password: expect.stringMatching('.'),
                    etherapies: [],
                },
            ],
        });
    });

    test('Should throw if UploadModeratorsListRepository throws', async () => {
        const { sut, uploadModeratorsListRepository } = makeSut();
        jest.spyOn(
            uploadModeratorsListRepository,
            'upload',
        ).mockImplementationOnce(() => {
            throw new Error('Random error');
        });

        await expect(
            sut.execute({
                offerId: 'fakeOfferId',
                moderatorsData: [
                    {
                        email: 'fulano@email.com',
                        name: 'fulano',
                        etherapiesIdentifiers: [],
                    },
                    {
                        email: 'sicrano@email.com',
                        name: 'sicrano',
                        etherapiesIdentifiers: [],
                    },
                ],
            }),
        ).rejects.toThrow();
    });

    test('Should call HashGenerater to create a password automatically', async () => {
        const { sut, hashGenerater } = makeSut();
        const generateSpy = jest.spyOn(hashGenerater, 'generate');
        await sut.execute({
            offerId: 'fakeOfferId',
            moderatorsData: [
                {
                    email: 'fulano@email.com',
                    name: 'fulano',
                    etherapiesIdentifiers: [],
                },
                {
                    email: 'sicrano@email.com',
                    name: 'sicrano',
                    etherapiesIdentifiers: [],
                },
            ],
        });
        expect(generateSpy).toHaveBeenCalledWith(expect.stringMatching('.'));
        expect(generateSpy).toHaveBeenCalledTimes(2);
    });

    test('Should throw if HashGenerater throws', async () => {
        const { sut, hashGenerater } = makeSut();
        jest.spyOn(hashGenerater, 'generate').mockImplementationOnce(() => {
            throw new Error('Random error');
        });

        await expect(
            sut.execute({
                offerId: 'fakeOfferId',
                moderatorsData: [
                    {
                        email: 'fulano@email.com',
                        name: 'fulano',
                        etherapiesIdentifiers: [],
                    },
                    {
                        email: 'sicrano@email.com',
                        name: 'sicrano',
                        etherapiesIdentifiers: [],
                    },
                ],
            }),
        ).rejects.toThrow();
    });
});
