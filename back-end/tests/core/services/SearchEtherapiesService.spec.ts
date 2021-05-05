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
});
