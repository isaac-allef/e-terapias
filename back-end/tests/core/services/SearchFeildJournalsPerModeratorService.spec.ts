/* eslint-disable max-classes-per-file */
import SearchFieldJournalsPerModeratorService from '../../../src/core/services/SearchFieldJournalsPerModeratorService';
import SearchFieldJournalsPerModeratorRepository from '../../../src/core/protocols/db/repositories/SearchFieldJournalsPerModeratorRepository';
import { SearchFieldJournalsPerModeratorRepositoryStub } from '../mocks/mockFieldJournal';

interface SutTypes {
    sut: SearchFieldJournalsPerModeratorService;
    searchFieldJournalsPerModeratorRepository: SearchFieldJournalsPerModeratorRepository;
}

const makeSut = (): SutTypes => {
    const searchFieldJournalsPerModeratorRepository = new SearchFieldJournalsPerModeratorRepositoryStub();
    const sut = new SearchFieldJournalsPerModeratorService(
        searchFieldJournalsPerModeratorRepository,
    );
    return {
        sut,
        searchFieldJournalsPerModeratorRepository,
    };
};

describe('load all Field journals per moderator usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({
            moderatorId: 'randomModeratorId',
            keywords: 'any_word',
            per_page: 10,
            page: 1,
        });
        expect(executeSpy).toHaveBeenCalledWith({
            moderatorId: 'randomModeratorId',
            keywords: 'any_word',
            per_page: 10,
            page: 1,
        });
    });

    test('Should call SearchFieldJournalsPerModeratorRepository with correct values', async () => {
        const { sut, searchFieldJournalsPerModeratorRepository } = makeSut();
        const searchSpy = jest.spyOn(
            searchFieldJournalsPerModeratorRepository,
            'searchPerModerator',
        );
        await sut.execute({
            moderatorId: 'randomModeratorId',
            keywords: 'any_word',
            per_page: 10,
            page: 1,
        });
        expect(searchSpy).toHaveBeenCalledWith({
            moderatorId: 'randomModeratorId',
            keywords: 'any_word',
            per_page: 10,
            page: 1,
        });
    });

    test('Should throw if SearchFieldJournalsPerModeratorRepository throws', async () => {
        const { sut, searchFieldJournalsPerModeratorRepository } = makeSut();
        jest.spyOn(
            searchFieldJournalsPerModeratorRepository,
            'searchPerModerator',
        ).mockImplementationOnce(() => {
            throw new Error('Random error');
        });
        await expect(
            sut.execute({
                moderatorId: 'randomModeratorId',
                keywords: 'any_word',
                per_page: 10,
                page: 1,
            }),
        ).rejects.toThrow();
    });
});
