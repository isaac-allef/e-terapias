/* eslint-disable max-classes-per-file */
import SearchEtherapiesService from '../../../src/core/services/SearchEtherapiesService';
import SearchEtherapiesRepository from '../../../src/core/protocols/db/repositories/SearchEtherapiesRepository';
import { SearchEtherapiesRepositoryStub } from '../mocks/mockEtherapy';

interface SutTypes {
    sut: SearchEtherapiesService;
    searchEtherapiesRepository: SearchEtherapiesRepository;
}

const makeSut = (): SutTypes => {
    const searchEtherapiesRepository = new SearchEtherapiesRepositoryStub();
    const sut = new SearchEtherapiesService(searchEtherapiesRepository);
    return {
        sut,
        searchEtherapiesRepository,
    };
};

describe('load all Etherapies usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute('viver é bom');
        expect(executeSpy).toHaveBeenCalledWith('viver é bom');
    });

    test('Should call SearchEtherapiesRepository with correct values', async () => {
        const { sut, searchEtherapiesRepository } = makeSut();
        const searchSpy = jest.spyOn(searchEtherapiesRepository, 'search');
        await sut.execute('viver é bom');
        expect(searchSpy).toHaveBeenCalledWith('viver é bom');
    });

    test('Should throw if SearchEtherapiesRepository throws', async () => {
        const { sut, searchEtherapiesRepository } = makeSut();
        jest.spyOn(searchEtherapiesRepository, 'search').mockImplementationOnce(
            () => {
                throw new Error('Random error');
            },
        );
        await expect(sut.execute('viver é bom')).rejects.toThrow();
    });
});
