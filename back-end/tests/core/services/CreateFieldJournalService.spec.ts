/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */

import CreateFieldJournalService from '../../../src/core/services/CreateFieldJournalService';
import CreateFieldJournalRepository from '../../../src/core/protocols/db/repositories/CreateFieldJournalRepository';
import LoadModeratorByIdRepository from '../../../src/core/protocols/db/repositories/LoadModeratorByIdRepository';
import LoadEtherapyByIdRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdRepository';
import { CreateFieldJournalRepositoryStub } from '../mocks/mockFieldJournal';
import { LoadModeratorByIdRepositoryStub } from '../mocks/mockModerator';
import { LoadEtherapyByIdRepositoryStub } from '../mocks/mockEtherapy';

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
                            name: 'viver é bom',
                            fieldJournals: [],
                            moderators: [],
                            template: {
                                id: 'randomIdTemplate',
                                name:
                                    'diário das eterapias de promoção ao bem-estar',
                                etherapies: [],
                                templateFields: [
                                    { name: 'Qual o seu nome?' },
                                    { name: 'Quanto é 2 + 2?' },
                                    {
                                        name: 'Informe sua data de nascimento',
                                    },
                                    { name: 'Voçê é estudante?' },
                                ],
                            },
                        },
                    ],
                    fieldJournals: [],
                    password: '1234',
                    token: 'randomToken',
                }),
            ),
        );
        jest.spyOn(loadEtherapyByIdRepository, 'load').mockReturnValueOnce(
            new Promise(resolve =>
                resolve({
                    id: 'randomIdEtherapy',
                    name: 'viver é bom',
                    fieldJournals: [],
                    moderators: [],
                    template: {
                        id: 'randomIdTemplate',
                        name: 'diário das eterapias de promoção ao bem-estar',
                        etherapies: [],
                        templateFields: [
                            { name: 'Qual o seu nome?' },
                            { name: 'Quanto é 2 + 2?' },
                            {
                                name: 'Informe sua data de nascimento',
                            },
                            { name: 'Voçê é estudante?' },
                        ],
                    },
                }),
            ),
        );
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({
            name: 'diário das eterapias de promoção ao bem-estar',
            fields: [
                { name: 'Qual o seu nome?', value: 'Isaac' },
                { name: 'Quanto é 2 + 2?', value: '4' },
                {
                    name: 'Informe sua data de nascimento',
                    value: "{% now 'iso-8601', '' %}",
                },
                { name: 'Voçê é estudante?', value: 'sim' },
            ],
            moderatorId: 'randomIdModerator',
            etherapyId: 'randomIdEtherapy',
        });
        expect(executeSpy).toHaveBeenCalledWith({
            name: 'diário das eterapias de promoção ao bem-estar',
            fields: [
                { name: 'Qual o seu nome?', value: 'Isaac' },
                { name: 'Quanto é 2 + 2?', value: '4' },
                {
                    name: 'Informe sua data de nascimento',
                    value: "{% now 'iso-8601', '' %}",
                },
                { name: 'Voçê é estudante?', value: 'sim' },
            ],
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
        await expect(
            sut.execute({
                name: 'diário das eterapias de promoção ao bem-estar',
                fields: [
                    { name: 'Qual o seu nome?', value: 'Isaac' },
                    { name: 'Quanto é 2 + 2?', value: '4' },
                    {
                        name: 'Informe sua data de nascimento',
                        value: "{% now 'iso-8601', '' %}",
                    },
                    { name: 'Voçê é estudante?', value: 'sim' },
                ],
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
        await expect(
            sut.execute({
                name: 'diário das eterapias de promoção ao bem-estar',
                fields: [
                    { name: 'Qual o seu nome?', value: 'Isaac' },
                    { name: 'Quanto é 2 + 2?', value: '4' },
                    {
                        name: 'Informe sua data de nascimento',
                        value: "{% now 'iso-8601', '' %}",
                    },
                    { name: 'Voçê é estudante?', value: 'sim' },
                ],
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
                                name: 'diferent etherapy',
                                fieldJournals: [],
                                moderators: [],
                                template: {
                                    id: 'randomIdTemplate',
                                    name:
                                        'diário das eterapias de promoção ao bem-estar',
                                    etherapies: [],
                                    templateFields: [
                                        { name: 'Qual o seu nome?' },
                                        { name: 'Quanto é 2 + 2?' },
                                        {
                                            name:
                                                'Informe sua data de nascimento',
                                        },
                                        { name: 'Voçê é estudante?' },
                                    ],
                                },
                            },
                        ],
                        fieldJournals: [],
                        password: '1234',
                        token: 'randomToken',
                    }),
                );
            },
        );
        jest.spyOn(loadEtherapyByIdRepository, 'load').mockImplementationOnce(
            () => {
                return new Promise(resolve =>
                    resolve({
                        id: 'randomIdEtherapy',
                        name: 'viver é bom',
                        fieldJournals: [],
                        moderators: [],
                        template: {
                            id: 'randomIdTemplate',
                            name:
                                'diário das eterapias de promoção ao bem-estar',
                            etherapies: [],
                            templateFields: [
                                { name: 'Qual o seu nome?' },
                                { name: 'Quanto é 2 + 2?' },
                                {
                                    name: 'Informe sua data de nascimento',
                                },
                                { name: 'Voçê é estudante?' },
                            ],
                        },
                    }),
                );
            },
        );
        await expect(
            sut.execute({
                name: 'diário das eterapias de promoção ao bem-estar',
                fields: [
                    { name: 'Qual o seu nome?', value: 'Isaac' },
                    { name: 'Quanto é 2 + 2?', value: '4' },
                    {
                        name: 'Informe sua data de nascimento',
                        value: "{% now 'iso-8601', '' %}",
                    },
                    { name: 'Voçê é estudante?', value: 'sim' },
                ],
                moderatorId: 'randomIdModerator',
                etherapyId: 'randomIdEtherapy',
            }),
        ).rejects.toThrow();
    });
});
