/* eslint-disable max-classes-per-file */
import CreateModeratorsService from '../../../src/core/services/CreateModeratorsService';
import CreateModeratorsRepository from '../../../src/core/protocols/db/repositories/CreateModeratorsRepository';
import HashGenerater from '../../../src/core/protocols/cryptography/HashGenerater';
import { CreateModeratorsRepositoryStub } from '../mocks/mockModerator';
import { LoadManyEtherapiesByIdentifiersRepositoryStub } from '../mocks/mockEtherapy';
import { HashGeneraterStub } from '../mocks/mockCryptography';
import LoadManyEtherapiesByIdentifierRepository from '../../../src/core/protocols/db/repositories/LoadManyEtherapiesByIdentifierRepository';

interface SutTypes {
    sut: CreateModeratorsService;
    hashGenerater: HashGenerater;
    createModeratorsRepository: CreateModeratorsRepository;
    loadManyEtherapiesByIdentifierRepository: LoadManyEtherapiesByIdentifierRepository;
}

const makeSut = (): SutTypes => {
    const hashGenerater = new HashGeneraterStub();
    const createModeratorsRepository = new CreateModeratorsRepositoryStub();
    const loadManyEtherapiesByIdentifierRepository = new LoadManyEtherapiesByIdentifiersRepositoryStub();
    const sut = new CreateModeratorsService(
        hashGenerater,
        createModeratorsRepository,
        loadManyEtherapiesByIdentifierRepository,
    );
    return {
        sut,
        hashGenerater,
        createModeratorsRepository,
        loadManyEtherapiesByIdentifierRepository,
    };
};

describe('Create Moderator usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute([
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
        ]);
        expect(executeSpy).toHaveBeenCalledWith([
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
        ]);
    });

    test('Should call CreateModeratorRepository with correct values', async () => {
        const { sut, createModeratorsRepository } = makeSut();
        const createSpy = jest.spyOn(createModeratorsRepository, 'create');
        await sut.execute([
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
        ]);
        expect(createSpy).toHaveBeenCalledWith([
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
        ]);
    });

    test('Should throw if CreateModeratorsRepository throws', async () => {
        const { sut, createModeratorsRepository } = makeSut();
        jest.spyOn(createModeratorsRepository, 'create').mockImplementationOnce(
            () => {
                throw new Error('Random error');
            },
        );

        await expect(
            sut.execute([
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
            ]),
        ).rejects.toThrow();
    });

    test('Should call HashGenerater to create a password automatically', async () => {
        const { sut, hashGenerater } = makeSut();
        const generateSpy = jest.spyOn(hashGenerater, 'generate');
        await sut.execute([
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
        ]);
        expect(generateSpy).toHaveBeenCalledWith(expect.stringMatching('.'));
        expect(generateSpy).toHaveBeenCalledTimes(2);
    });

    test('Should throw if HashGenerater throws', async () => {
        const { sut, hashGenerater } = makeSut();
        jest.spyOn(hashGenerater, 'generate').mockImplementationOnce(() => {
            throw new Error('Random error');
        });

        await expect(
            sut.execute([
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
            ]),
        ).rejects.toThrow();
    });
});
