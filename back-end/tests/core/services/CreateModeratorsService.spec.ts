/* eslint-disable max-classes-per-file */
import CreateModeratorsService from '../../../src/core/services/CreateModeratorsService';
import CreateModeratorRepository from '../../../src/core/protocols/db/repositories/CreateModeratorRepository';
import HashGenerater from '../../../src/core/protocols/cryptography/HashGenerater';
import { CreateModeratorRepositoryStub } from '../mocks/mockModerator';
import { HashGeneraterStub } from '../mocks/mockCryptography';

interface SutTypes {
    sut: CreateModeratorsService;
    hashGenerater: HashGenerater;
    createModeratorRepository: CreateModeratorRepository;
}

const makeSut = (): SutTypes => {
    const hashGenerater = new HashGeneraterStub();
    const createModeratorRepository = new CreateModeratorRepositoryStub();
    const sut = new CreateModeratorsService(
        hashGenerater,
        createModeratorRepository,
    );
    return {
        sut,
        hashGenerater,
        createModeratorRepository,
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
        const { sut, createModeratorRepository } = makeSut();
        const createSpy = jest.spyOn(createModeratorRepository, 'create');
        await sut.execute([
            { email: 'fulano@email.com', name: 'fulano' },
            { email: 'sicrano@email.com', name: 'sicrano' },
        ]);
        expect(createSpy).toHaveBeenCalledWith({
            email: 'fulano@email.com',
            name: 'fulano',
            password: expect.stringMatching('.'),
        });
        expect(createSpy).toHaveBeenCalledWith({
            email: 'sicrano@email.com',
            name: 'sicrano',
            password: expect.stringMatching('.'),
        });
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
