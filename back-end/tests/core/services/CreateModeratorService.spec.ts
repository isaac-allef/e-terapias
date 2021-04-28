/* eslint-disable max-classes-per-file */
import CreateModeratorService from '../../../src/core/services/CreateModeratorService';
import CreateModeratorRepository from '../../../src/core/protocols/db/repositories/CreateModeratorRepository';
import Moderator from '../../../src/core/entities/Moderator';

const makeCreateModeratorRepository = (): CreateModeratorRepository => {
    class CreateModeratorRepositoryStub implements CreateModeratorRepository {
        async create(): Promise<Moderator> {
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

    return new CreateModeratorRepositoryStub();
};

interface SutTypes {
    sut: CreateModeratorService;
    createModeratorRepository: CreateModeratorRepository;
}

const makeSut = (): SutTypes => {
    const createModeratorRepository = makeCreateModeratorRepository();
    const sut = new CreateModeratorService(createModeratorRepository);
    return {
        sut,
        createModeratorRepository,
    };
};

describe('Create Moderator usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({ email: 'fulano@email.com', name: 'fulano' });
        expect(executeSpy).toHaveBeenCalledWith({
            email: 'fulano@email.com',
            name: 'fulano',
        });
    });
});
