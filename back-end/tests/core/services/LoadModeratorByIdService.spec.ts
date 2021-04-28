/* eslint-disable max-classes-per-file */
import LoadModeratorByIdService from '../../../src/core/services/LoadModeratorByIdService';
import LoadModeratorByIdRepository from '../../../src/core/protocols/db/repositories/LoadModeratorByIdRepository';
import Moderator from '../../../src/core/entities/Moderator';

const makeLoadModeratorByIdRepository = (): LoadModeratorByIdRepository => {
    class LoadModeratorByIdRepositoryStub
        implements LoadModeratorByIdRepository {
        async load(): Promise<Moderator> {
            const moderator: Moderator = {
                id: 'randomId',
                email: 'fulano@email.com',
                name: 'fulano',
                etherapies: [],
                fieldJournals: [],
                password: '1234',
                token: 'randomToken',
            };

            return new Promise(resolve => resolve(moderator));
        }
    }

    return new LoadModeratorByIdRepositoryStub();
};

interface SutTypes {
    sut: LoadModeratorByIdService;
    loadModeratorByIdRepository: LoadModeratorByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadModeratorByIdRepository = makeLoadModeratorByIdRepository();
    const sut = new LoadModeratorByIdService(loadModeratorByIdRepository);
    return {
        sut,
        loadModeratorByIdRepository,
    };
};

describe('load Moderator by id usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute('randomId');
        expect(executeSpy).toHaveBeenCalledWith('randomId');
    });

    test('Should call LoadModeratorByIdRepository with correct values', async () => {
        const { sut, loadModeratorByIdRepository } = makeSut();
        const loadSpy = jest.spyOn(loadModeratorByIdRepository, 'load');
        await sut.execute('randomId');
        expect(loadSpy).toHaveBeenCalledWith('randomId');
    });
});
