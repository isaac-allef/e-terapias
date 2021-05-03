/* eslint-disable max-classes-per-file */
import CreateModeratorsService from '../../../src/core/services/CreateModeratorsService';
import CreateModeratorsRepository from '../../../src/core/protocols/db/repositories/CreateModeratorsRepository';
import HashGenerater from '../../../src/core/protocols/cryptography/HashGenerater';
import { CreateModeratorsRepositoryStub } from '../mocks/mockModerator';
import { HashGeneraterStub } from '../mocks/mockCryptography';

interface SutTypes {
    sut: CreateModeratorsService;
    hashGenerater: HashGenerater;
    createModeratorsRepository: CreateModeratorsRepository;
}

const makeSut = (): SutTypes => {
    const hashGenerater = new HashGeneraterStub();
    const createModeratorsRepository = new CreateModeratorsRepositoryStub();
    const sut = new CreateModeratorsService(
        hashGenerater,
        createModeratorsRepository,
    );
    return {
        sut,
        hashGenerater,
        createModeratorsRepository,
    };
};

describe('Create Moderator usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute([
            { email: 'fulano@email.com', name: 'fulano' },
            { email: 'sicrano@email.com', name: 'sicrano' },
        ]);
        expect(executeSpy).toHaveBeenCalledWith([
            { email: 'fulano@email.com', name: 'fulano' },
            { email: 'sicrano@email.com', name: 'sicrano' },
        ]);
    });

    test('Should call CreateModeratorRepository with correct values', async () => {
        const { sut, createModeratorsRepository } = makeSut();
        const createSpy = jest.spyOn(createModeratorsRepository, 'create');
        await sut.execute([
            { email: 'fulano@email.com', name: 'fulano' },
            { email: 'sicrano@email.com', name: 'sicrano' },
        ]);
        expect(createSpy).toHaveBeenCalledWith([
            {
                email: 'fulano@email.com',
                name: 'fulano',
                password: expect.stringMatching('.'),
            },
            {
                email: 'sicrano@email.com',
                name: 'sicrano',
                password: expect.stringMatching('.'),
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
                { email: 'fulano@email.com', name: 'fulano' },
                { email: 'sicrano@email.com', name: 'sicrano' },
            ]),
        ).rejects.toThrow();
    });

    test('Should call HashGenerater to create a password automatically', async () => {
        const { sut, hashGenerater } = makeSut();
        const generateSpy = jest.spyOn(hashGenerater, 'generate');
        await sut.execute([
            { email: 'fulano@email.com', name: 'fulano' },
            { email: 'sicrano@email.com', name: 'sicrano' },
        ]);
        expect(generateSpy).toHaveBeenCalledWith(expect.stringMatching('.'));
        expect(generateSpy).toHaveBeenCalledTimes(2);
    });
});
