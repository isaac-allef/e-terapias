/* eslint-disable max-classes-per-file */
import LoadAllEtherapiesService from '../../../src/core/services/LoadAllEtherapiesService';
import LoadAllEtherapiesRepository from '../../../src/core/protocols/db/repositories/LoadAllEtherapiesRepository';
import { LoadAllEtherapiesRepositoryStub } from '../mocks/mockEtherapy';

interface SutTypes {
    sut: LoadAllEtherapiesService;
    loadAllEtherapiesRepository: LoadAllEtherapiesRepository;
}

const makeSut = (): SutTypes => {
    const loadAllEtherapiesRepository = new LoadAllEtherapiesRepositoryStub();
    const sut = new LoadAllEtherapiesService(loadAllEtherapiesRepository);
    return {
        sut,
        loadAllEtherapiesRepository,
    };
};

describe('load all Etherapies usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({
            sort: 'updated_at',
            direction: 'asc',
            per_page: 10,
            page: 1,
        });
        expect(executeSpy).toHaveBeenCalledWith({
            sort: 'updated_at',
            direction: 'asc',
            per_page: 10,
            page: 1,
        });
    });

    test('Should call LoadAllEtherapiesRepository with correct values', async () => {
        const { sut, loadAllEtherapiesRepository } = makeSut();
        const loadAllSpy = jest.spyOn(loadAllEtherapiesRepository, 'loadAll');
        await sut.execute({
            sort: 'updated_at',
            direction: 'asc',
            per_page: 10,
            page: 1,
        });
        expect(loadAllSpy).toHaveBeenCalledWith({
            sort: 'updated_at',
            direction: 'asc',
            per_page: 10,
            page: 1,
        });
    });
});
