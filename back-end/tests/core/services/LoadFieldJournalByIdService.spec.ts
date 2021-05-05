/* eslint-disable max-classes-per-file */
import LoadFieldJournalByIdService from '../../../src/core/services/LoadFieldJournalByIdService';
import LoadFieldJournalByIdRepository from '../../../src/core/protocols/db/repositories/LoadFieldJournalByIdRepository';
import { LoadFieldJournalByIdRepositoryStub } from '../mocks/mockFieldJournal';

interface SutTypes {
    sut: LoadFieldJournalByIdService;
    loadFieldJournalByIdRepository: LoadFieldJournalByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadFieldJournalByIdRepository = new LoadFieldJournalByIdRepositoryStub();
    const sut = new LoadFieldJournalByIdService(loadFieldJournalByIdRepository);
    return {
        sut,
        loadFieldJournalByIdRepository,
    };
};

describe('load FieldJournal by id usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute('randomId');
        expect(executeSpy).toHaveBeenCalledWith('randomId');
    });

    test('Should call LoadFieldJournalByIdRepository with correct values', async () => {
        const { sut, loadFieldJournalByIdRepository } = makeSut();
        const loadSpy = jest.spyOn(loadFieldJournalByIdRepository, 'load');
        await sut.execute('randomId');
        expect(loadSpy).toHaveBeenCalledWith('randomId');
    });

    test('Should throw if LoadFieldJournalByIdRepository throws', async () => {
        const { sut, loadFieldJournalByIdRepository } = makeSut();
        jest.spyOn(
            loadFieldJournalByIdRepository,
            'load',
        ).mockImplementationOnce(() => {
            throw new Error('Random error');
        });
        await expect(sut.execute('randomId')).rejects.toThrow();
    });
});
