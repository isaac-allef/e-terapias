/* eslint-disable max-classes-per-file */
import CreateEtherapyService from '../../../src/core/services/CreateEtherapyService';
import CreateEtherapyRepository from '../../../src/core/protocols/db/repositories/CreateEtherapyRepository';
import { CreateEtherapyRepositoryStub } from '../mocks/mockEtherapy';

interface SutTypes {
    sut: CreateEtherapyService;
    createEtherapyRepository: CreateEtherapyRepository;
}

const makeSut = (): SutTypes => {
    const createEtherapyRepository = new CreateEtherapyRepositoryStub();
    const sut = new CreateEtherapyService(createEtherapyRepository);
    return {
        sut,
        createEtherapyRepository,
    };
};

describe('Create Etherapy usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({ name: 'viver é bom' });
        expect(executeSpy).toHaveBeenCalledWith({
            name: 'viver é bom',
        });
    });

    test('Should call CreateEtherapyRepository with correct values', async () => {
        const { sut, createEtherapyRepository } = makeSut();
        const createSpy = jest.spyOn(createEtherapyRepository, 'create');
        await sut.execute({ name: 'viver é bom' });
        expect(createSpy).toHaveBeenCalledWith({ name: 'viver é bom' });
    });
});
