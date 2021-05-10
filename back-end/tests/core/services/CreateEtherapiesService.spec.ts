/* eslint-disable max-classes-per-file */
import CreateEtherapiesService from '../../../src/core/services/CreateEtherapiesService';
import CreateEtherapiesRepository from '../../../src/core/protocols/db/repositories/CreateEtherapiesRepository';
import { CreateEtherapiesRepositoryStub } from '../mocks/mockEtherapy';

interface SutTypes {
    sut: CreateEtherapiesService;
    createEtherapiesRepository: CreateEtherapiesRepository;
}

const makeSut = (): SutTypes => {
    const createEtherapiesRepository = new CreateEtherapiesRepositoryStub();
    const sut = new CreateEtherapiesService(createEtherapiesRepository);
    return {
        sut,
        createEtherapiesRepository,
    };
};

describe('Create Etherapy usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute([
            { identifier: 'any_identifier', name: 'viver é bom' },
            { identifier: 'any_identifier', name: 'não desista' },
        ]);
        expect(executeSpy).toHaveBeenCalledWith([
            { identifier: 'any_identifier', name: 'viver é bom' },
            { identifier: 'any_identifier', name: 'não desista' },
        ]);
    });

    test('Should call CreateEtherapiesRepository with correct values', async () => {
        const { sut, createEtherapiesRepository } = makeSut();
        const createSpy = jest.spyOn(createEtherapiesRepository, 'create');
        await sut.execute([
            { identifier: 'any_identifier', name: 'viver é bom' },
            { identifier: 'any_identifier', name: 'não desista' },
        ]);
        expect(createSpy).toHaveBeenCalledWith([
            { identifier: 'any_identifier', name: 'viver é bom' },
            { identifier: 'any_identifier', name: 'não desista' },
        ]);
    });

    test('Should throw if CreateEtherapiesRepository throws', async () => {
        const { sut, createEtherapiesRepository } = makeSut();
        jest.spyOn(createEtherapiesRepository, 'create').mockImplementationOnce(
            () => {
                throw new Error('Random error');
            },
        );

        await expect(
            sut.execute([
                { identifier: 'any_identifier', name: 'viver é bom' },
                { identifier: 'any_identifier', name: 'não desista' },
            ]),
        ).rejects.toThrow();
    });
});
