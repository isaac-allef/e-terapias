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
        });
        expect(executeSpy).toHaveBeenCalledWith({
            moderatorId: 'randomModeratorId',
            keywords: 'any_word',
        });
    });
});
