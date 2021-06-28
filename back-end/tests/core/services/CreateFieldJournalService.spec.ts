/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */

import CreateFieldJournalService from '../../../src/core/services/CreateFieldJournalService';
import CreateFieldJournalRepository from '../../../src/core/protocols/db/repositories/CreateFieldJournalRepository';
import LoadModeratorByIdRepository from '../../../src/core/protocols/db/repositories/LoadModeratorByIdRepository';
import LoadEtherapyByIdRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdRepository';
import { CreateFieldJournalRepositoryStub } from '../mocks/mockFieldJournal';
import { LoadModeratorByIdRepositoryStub } from '../mocks/mockModerator';
import { LoadEtherapyByIdRepositoryStub } from '../mocks/mockEtherapy';
import { templateField } from '../../../src/core/entities/Template';
import { field } from '../../../src/core/entities/FieldJournal';

interface SutTypes {
    sut: CreateFieldJournalService;
    createFieldJournalRepository: CreateFieldJournalRepository;
    loadModeratorByIdRepository: LoadModeratorByIdRepository;
    loadEtherapyByIdRepository: LoadEtherapyByIdRepository;
}

const makeSut = (): SutTypes => {
    const createFieldJournalRepository = new CreateFieldJournalRepositoryStub();
    const loadModeratorByIdRepository = new LoadModeratorByIdRepositoryStub();
    const loadEtherapyByIdRepository = new LoadEtherapyByIdRepositoryStub();
    const sut = new CreateFieldJournalService(
        createFieldJournalRepository,
        loadModeratorByIdRepository,
        loadEtherapyByIdRepository,
    );
    return {
        sut,
        createFieldJournalRepository,
        loadModeratorByIdRepository,
        loadEtherapyByIdRepository,
    };
};

const fakeOffer = {
    id: 'fakeOfferId',
    name: 'fakeOffer',
    dateStart: new Date(),
    dateEnd: new Date(),
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

const fakeTemplateFields: templateField[] = [
    { name: 'Qual o seu nome?', type: 'short', isRequired: true },
    { name: 'Fale sobre você', type: 'long', isRequired: true },
];

const fakeFields: field[] = [
    {
        name: 'Qual o seu nome?',
        type: 'short',
        value: 'isaac',
        isRequired: true,
    },
    {
        name: 'Fale sobre você',
        type: 'long',
        value: 'eu sou um cara legal',
        isRequired: true,
    },
];

describe('Create field journal usecase', () => {
    test('Should call with correct values', async () => {
        const {
            sut,
            loadModeratorByIdRepository,
            loadEtherapyByIdRepository,
        } = makeSut();
        jest.spyOn(loadModeratorByIdRepository, 'load').mockReturnValueOnce(
            new Promise(resolve =>
                resolve({
                    id: 'randomIdModerator',
                    email: 'fulano@email.com',
                    name: 'fulano',
                    etherapies: [
                        {
                            id: 'randomIdEtherapy',
                            identifier: 'any_identifier',
                            name: 'viver é bom',
                            fieldJournals: [],
                            moderators: [],
                            template: {
                                id: 'randomIdTemplate',
                                name:
                                    'diário das eterapias de promoção ao bem-estar',
                                etherapies: [],
                                templateFields: fakeTemplateFields,
                            },
                            offer: fakeOffer,
                        },
                    ],
                    fieldJournals: [],
                    password: '1234',
                    token: 'randomToken',
                    role: '',
                }),
            ),
        );
        jest.spyOn(loadEtherapyByIdRepository, 'load').mockReturnValueOnce(
            new Promise(resolve =>
                resolve({
                    id: 'randomIdEtherapy',
                    identifier: 'any_identifier',
                    name: 'viver é bom',
                    fieldJournals: [],
                    moderators: [],
                    template: {
                        id: 'randomIdTemplate',
                        name: 'diário das eterapias de promoção ao bem-estar',
                        etherapies: [],
                        templateFields: fakeTemplateFields,
                    },
                    offer: fakeOffer,
                }),
            ),
        );
        const executeSpy = jest.spyOn(sut, 'execute');
        const date = new Date();
        await sut.execute({
            name: 'diário das eterapias de promoção ao bem-estar',
            date,
            fields: fakeFields,
            moderatorId: 'randomIdModerator',
            etherapyId: 'randomIdEtherapy',
        });
        expect(executeSpy).toHaveBeenCalledWith({
            name: 'diário das eterapias de promoção ao bem-estar',
            date,
            fields: fakeFields,
            moderatorId: 'randomIdModerator',
            etherapyId: 'randomIdEtherapy',
        });
    });

    test('Should throw if LoadModeratorByIdRepository throws', async () => {
        const { sut, loadModeratorByIdRepository } = makeSut();
        jest.spyOn(loadModeratorByIdRepository, 'load').mockImplementationOnce(
            () => {
                throw new Error('Random error');
            },
        );
        const date = new Date();
        await expect(
            sut.execute({
                name: 'diário das eterapias de promoção ao bem-estar',
                date,
                fields: fakeFields,
                moderatorId: 'randomIdModerator',
                etherapyId: 'randomIdEtherapy',
            }),
        ).rejects.toThrow();
    });

    test('Should throw if LoadEtherapyByIdRepository throws', async () => {
        const { sut, loadEtherapyByIdRepository } = makeSut();
        jest.spyOn(loadEtherapyByIdRepository, 'load').mockImplementationOnce(
            () => {
                throw new Error('Random error');
            },
        );
        const date = new Date();
        await expect(
            sut.execute({
                name: 'diário das eterapias de promoção ao bem-estar',
                date,
                fields: fakeFields,
                moderatorId: 'randomIdModerator',
                etherapyId: 'randomIdEtherapy',
            }),
        ).rejects.toThrow();
    });

    test('Should throw if moderator and etherapy is not related', async () => {
        const {
            sut,
            loadModeratorByIdRepository,
            loadEtherapyByIdRepository,
        } = makeSut();

        jest.spyOn(loadModeratorByIdRepository, 'load').mockImplementationOnce(
            () => {
                return new Promise(resolve =>
                    resolve({
                        id: 'randomIdModerator',
                        email: 'fulano@email.com',
                        name: 'fulano',
                        etherapies: [
                            {
                                id: 'diferentRandomIdEtherapy',
                                identifier: 'any_identifier',
                                name: 'diferent etherapy',
                                fieldJournals: [],
                                moderators: [],
                                template: {
                                    id: 'randomIdTemplate',
                                    name:
                                        'diário das eterapias de promoção ao bem-estar',
                                    etherapies: [],
                                    templateFields: fakeTemplateFields,
                                },
                                offer: fakeOffer,
                            },
                        ],
                        fieldJournals: [],
                        password: '1234',
                        token: 'randomToken',
                        role: '',
                    }),
                );
            },
        );
        jest.spyOn(loadEtherapyByIdRepository, 'load').mockImplementationOnce(
            () => {
                return new Promise(resolve =>
                    resolve({
                        id: 'randomIdEtherapy',
                        identifier: 'any_identifier',
                        name: 'viver é bom',
                        fieldJournals: [],
                        moderators: [],
                        template: {
                            id: 'randomIdTemplate',
                            name:
                                'diário das eterapias de promoção ao bem-estar',
                            etherapies: [],
                            templateFields: fakeTemplateFields,
                        },
                        offer: fakeOffer,
                    }),
                );
            },
        );
        const date = new Date();
        await expect(
            sut.execute({
                name: 'diário das eterapias de promoção ao bem-estar',
                date,
                fields: fakeFields,
                moderatorId: 'randomIdModerator',
                etherapyId: 'randomIdEtherapy',
            }),
        ).rejects.toThrow();
    });

    test('Should throw if etherapy does not have a template', async () => {
        const {
            sut,
            loadModeratorByIdRepository,
            loadEtherapyByIdRepository,
        } = makeSut();

        jest.spyOn(loadModeratorByIdRepository, 'load').mockImplementationOnce(
            () => {
                return new Promise(resolve =>
                    resolve({
                        id: 'randomIdModerator',
                        email: 'fulano@email.com',
                        name: 'fulano',
                        etherapies: [
                            {
                                id: 'randomIdEtherapy',
                                identifier: 'any_identifier',
                                name: 'viver é bom',
                                fieldJournals: [],
                                moderators: [],
                                template: {
                                    id: 'randomIdTemplate',
                                    name:
                                        'diário das eterapias de promoção ao bem-estar',
                                    etherapies: [],
                                    templateFields: fakeTemplateFields,
                                },
                                offer: fakeOffer,
                            },
                        ],
                        fieldJournals: [],
                        password: '1234',
                        token: 'randomToken',
                        role: '',
                    }),
                );
            },
        );
        jest.spyOn(loadEtherapyByIdRepository, 'load').mockImplementationOnce(
            () => {
                return new Promise(resolve =>
                    resolve({
                        id: 'randomIdEtherapy',
                        identifier: 'any_identifier',
                        name: 'viver é bom',
                        fieldJournals: [],
                        moderators: [],
                        template: null,
                        offer: fakeOffer,
                    }),
                );
            },
        );
        const date = new Date();
        await expect(
            sut.execute({
                name: 'diário das eterapias de promoção ao bem-estar',
                date,
                fields: fakeFields,
                moderatorId: 'randomIdModerator',
                etherapyId: 'randomIdEtherapy',
            }),
        ).rejects.toThrow();
    });

    test('Should throw if field journal does not match template', async () => {
        const {
            sut,
            loadModeratorByIdRepository,
            loadEtherapyByIdRepository,
        } = makeSut();

        jest.spyOn(loadModeratorByIdRepository, 'load').mockImplementationOnce(
            () => {
                return new Promise(resolve =>
                    resolve({
                        id: 'randomIdModerator',
                        email: 'fulano@email.com',
                        name: 'fulano',
                        etherapies: [
                            {
                                id: 'randomIdEtherapy',
                                identifier: 'any_identifier',
                                name: 'viver é bom',
                                fieldJournals: [],
                                moderators: [],
                                template: {
                                    id: 'randomIdTemplate',
                                    name:
                                        'diário das eterapias de promoção ao bem-estar',
                                    etherapies: [],
                                    templateFields: fakeTemplateFields,
                                },
                                offer: fakeOffer,
                            },
                        ],
                        fieldJournals: [],
                        password: '1234',
                        token: 'randomToken',
                        role: '',
                    }),
                );
            },
        );
        jest.spyOn(loadEtherapyByIdRepository, 'load').mockImplementationOnce(
            () => {
                return new Promise(resolve =>
                    resolve({
                        id: 'randomIdEtherapy',
                        identifier: 'any_identifier',
                        name: 'viver é bom',
                        fieldJournals: [],
                        moderators: [],
                        template: {
                            id: 'randomIdTemplate',
                            name:
                                'diário das eterapias de promoção ao bem-estar',
                            etherapies: [],
                            templateFields: [
                                {
                                    name: 'Question of diferent template',
                                    type: 'long',
                                    isRequired: true,
                                },
                            ],
                        },
                        offer: fakeOffer,
                    }),
                );
            },
        );
        await expect(
            sut.execute({
                name: 'diário das eterapias de promoção ao bem-estar',
                date: new Date(),
                fields: fakeFields,
                moderatorId: 'randomIdModerator',
                etherapyId: 'randomIdEtherapy',
            }),
        ).rejects.toThrow();
    });
});
