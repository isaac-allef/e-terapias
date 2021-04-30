/* eslint-disable max-classes-per-file */
import CreateEtherapiesService from '../../../src/core/services/CreateEtherapiesService';
import CreateEtherapiesRepository from '../../../src/core/protocols/db/repositories/CreateEtherapiesRepository';
import { CreateEtherapiesRepositoryStub } from '../mocks/mockEtherapy';

interface SutTypes {
    sut: CreateEtherapiesService;
    createEtherapyRepository: CreateEtherapiesRepository;
}

const makeSut = (): SutTypes => {
    const createEtherapyRepository = new CreateEtherapiesRepositoryStub();
    const sut = new CreateEtherapiesService(createEtherapyRepository);
    return {
        sut,
        createEtherapyRepository,
    };
};

describe('Create Etherapy usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute([{ name: 'viver é bom' }, { name: 'não desista' }]);
        expect(executeSpy).toHaveBeenCalledWith([
            { name: 'viver é bom' },
            { name: 'não desista' },
        ]);
    });

    test('Should call CreateEtherapyRepository with correct values', async () => {
        const { sut, createEtherapyRepository } = makeSut();
        const createSpy = jest.spyOn(createEtherapyRepository, 'create');
        await sut.execute([{ name: 'viver é bom' }, { name: 'não desista' }]);
        expect(createSpy).toHaveBeenCalledWith([
            { name: 'viver é bom' },
            { name: 'não desista' },
        ]);
    });
});
