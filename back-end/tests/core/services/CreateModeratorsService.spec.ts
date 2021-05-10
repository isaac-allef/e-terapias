/* eslint-disable max-classes-per-file */
import CreateModeratorsService from '../../../src/core/services/CreateModeratorsService';
import CreateModeratorsRepository from '../../../src/core/protocols/db/repositories/CreateModeratorsRepository';
import HashGenerater from '../../../src/core/protocols/cryptography/HashGenerater';
import { CreateModeratorsRepositoryStub } from '../mocks/mockModerator';
import { HashGeneraterStub } from '../mocks/mockCryptography';
import LinkModeratorsToEtherapiesRepository from '../../../src/core/protocols/db/repositories/LinkModeratorsToEtherapiesRepository';
import { LinkModeratorsToEtherapiesRepositoryStub } from '../mocks/mockLink';

interface SutTypes {
    sut: CreateModeratorsService;
    hashGenerater: HashGenerater;
    createModeratorsRepository: CreateModeratorsRepository;
    linkModeratorsToEtherapiesRepository: LinkModeratorsToEtherapiesRepository;
}

const makeSut = (): SutTypes => {
    const hashGenerater = new HashGeneraterStub();
    const createModeratorsRepository = new CreateModeratorsRepositoryStub();
    const linkModeratorsToEtherapiesRepository = new LinkModeratorsToEtherapiesRepositoryStub();
    const sut = new CreateModeratorsService(
        hashGenerater,
        createModeratorsRepository,
        linkModeratorsToEtherapiesRepository,
    );
    return {
        sut,
        hashGenerater,
        createModeratorsRepository,
        linkModeratorsToEtherapiesRepository,
    };
};

describe('Create Moderator usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({
            data: [
                { email: 'fulano@email.com', name: 'fulano' },
                { email: 'sicrano@email.com', name: 'sicrano' },
            ],
            links: [],
        });
        expect(executeSpy).toHaveBeenCalledWith({
            data: [
                { email: 'fulano@email.com', name: 'fulano' },
                { email: 'sicrano@email.com', name: 'sicrano' },
            ],
            links: [],
        });
    });

    test('Should call CreateModeratorRepository with correct values', async () => {
        const { sut, createModeratorsRepository } = makeSut();
        const createSpy = jest.spyOn(createModeratorsRepository, 'create');
        await sut.execute({
            data: [
                { email: 'fulano@email.com', name: 'fulano' },
                { email: 'sicrano@email.com', name: 'sicrano' },
            ],
            links: [],
        });
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
            sut.execute({
                data: [
                    { email: 'fulano@email.com', name: 'fulano' },
                    { email: 'sicrano@email.com', name: 'sicrano' },
                ],
                links: [],
            }),
        ).rejects.toThrow();
    });

    test('Should call HashGenerater to create a password automatically', async () => {
        const { sut, hashGenerater } = makeSut();
        const generateSpy = jest.spyOn(hashGenerater, 'generate');
        await sut.execute({
            data: [
                { email: 'fulano@email.com', name: 'fulano' },
                { email: 'sicrano@email.com', name: 'sicrano' },
            ],
            links: [],
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
                data: [
                    { email: 'fulano@email.com', name: 'fulano' },
                    { email: 'sicrano@email.com', name: 'sicrano' },
                ],
                links: [],
            }),
        ).rejects.toThrow();
    });
});
