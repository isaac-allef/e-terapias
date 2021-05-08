/* eslint-disable max-classes-per-file */
import LoadAllFieldJournalsPerModeratorService from '../../../src/core/services/LoadAllFieldJournalsPerModeratorService';
import LoadAllFieldJournalsPerModeratorRepository from '../../../src/core/protocols/db/repositories/LoadAllFieldJournalsPerModeratorRepository';
import { LoadAllFieldJournalsPerModeratorRepositoryStub } from '../mocks/mockFieldJournal';

interface SutTypes {
    sut: LoadAllFieldJournalsPerModeratorService;
    loadAllFieldJournalsPerModeratorRepository: LoadAllFieldJournalsPerModeratorRepository;
}

const makeSut = (): SutTypes => {
    const loadAllFieldJournalsPerModeratorRepository = new LoadAllFieldJournalsPerModeratorRepositoryStub();
    const sut = new LoadAllFieldJournalsPerModeratorService(
        loadAllFieldJournalsPerModeratorRepository,
    );
    return {
        sut,
        loadAllFieldJournalsPerModeratorRepository,
    };
};

describe('load all FieldJournalsPerModerator usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({
            moderatorId: 'randomModeratorId',
            sort: 'updated_at',
            direction: 'asc',
            per_page: 10,
            page: 1,
        });
        expect(executeSpy).toHaveBeenCalledWith({
            moderatorId: 'randomModeratorId',
            sort: 'updated_at',
            direction: 'asc',
            per_page: 10,
            page: 1,
        });
    });

    test('Should call LoadAllFieldJournalsPerModeratorRepository with correct values', async () => {
        const { sut, loadAllFieldJournalsPerModeratorRepository } = makeSut();
        const loadAllSpy = jest.spyOn(
            loadAllFieldJournalsPerModeratorRepository,
            'loadAllPerModerator',
        );
        await sut.execute({
            moderatorId: 'randomModeratorId',
            sort: 'updated_at',
            direction: 'asc',
            per_page: 10,
            page: 1,
        });
        expect(loadAllSpy).toHaveBeenCalledWith({
            moderatorId: 'randomModeratorId',
            sort: 'updated_at',
            direction: 'asc',
            per_page: 10,
            page: 1,
        });
    });

    test('Should throw if LoadAllFieldJournalsPerModeratorRepository throws', async () => {
        const { sut, loadAllFieldJournalsPerModeratorRepository } = makeSut();
        jest.spyOn(
            loadAllFieldJournalsPerModeratorRepository,
            'loadAllPerModerator',
        ).mockImplementationOnce(() => {
            throw new Error('Random error');
        });
        await expect(
            sut.execute({
                moderatorId: 'randomModeratorId',
                sort: 'updated_at',
                direction: 'asc',
                per_page: 10,
                page: 1,
            }),
        ).rejects.toThrow();
    });
});
