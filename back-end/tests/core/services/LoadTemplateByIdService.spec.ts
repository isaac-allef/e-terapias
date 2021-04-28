/* eslint-disable max-classes-per-file */
import LoadTemplateByIdService from '../../../src/core/services/LoadTemplateByIdService';
import LoadTemplateByIdRepository from '../../../src/core/protocols/db/repositories/LoadTemplateByIdRepository';
import { LoadTemplateByIdRepositoryStub } from '../mocks/mockTemplate';

interface SutTypes {
    sut: LoadTemplateByIdService;
    loadTemplateByIdRepository: LoadTemplateByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadTemplateByIdRepository = new LoadTemplateByIdRepositoryStub();
    const sut = new LoadTemplateByIdService(loadTemplateByIdRepository);
    return {
        sut,
        loadTemplateByIdRepository,
    };
};

describe('load Template by id usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute('randomId');
        expect(executeSpy).toHaveBeenCalledWith('randomId');
    });

    test('Should call LoadTemplateByIdRepository with correct values', async () => {
        const { sut, loadTemplateByIdRepository } = makeSut();
        const loadSpy = jest.spyOn(loadTemplateByIdRepository, 'load');
        await sut.execute('randomId');
        expect(loadSpy).toHaveBeenCalledWith('randomId');
    });
});
