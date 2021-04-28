/* eslint-disable max-classes-per-file */
import CreateModeratorService from '../../../src/core/services/CreateModeratorService';
import CreateModeratorRepository from '../../../src/core/protocols/db/repositories/CreateModeratorRepository';
import Moderator from '../../../src/core/entities/Moderator';
import HashGenerater from '../../../src/core/protocols/cryptography/HashGenerater';

const makeHashGenerater = (): HashGenerater => {
    class HashGeneraterStub implements HashGenerater {
        async generate(payload: string): Promise<string> {
            return new Promise(resolve => resolve(payload));
        }
    }

    return new HashGeneraterStub();
};

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
    hashGenerater: HashGenerater;
    createModeratorRepository: CreateModeratorRepository;
}

const makeSut = (): SutTypes => {
    const hashGenerater = makeHashGenerater();
    const createModeratorRepository = makeCreateModeratorRepository();
    const sut = new CreateModeratorService(
        hashGenerater,
        createModeratorRepository,
    );
    return {
        sut,
        hashGenerater,
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

    test('Should call CreateModeratorRepository with correct values', async () => {
        const { sut, createModeratorRepository } = makeSut();
        const createSpy = jest.spyOn(createModeratorRepository, 'create');
        await sut.execute({ email: 'fulano@email.com', name: 'fulano' });
        expect(createSpy).toHaveBeenCalledWith({
            email: 'fulano@email.com',
            name: 'fulano',
            password: expect.stringMatching('.'),
        });
    });

    test('Should call HashGenerater to create a password automatically', async () => {
        const { sut, hashGenerater } = makeSut();
        const generateSpy = jest.spyOn(hashGenerater, 'generate');
        await sut.execute({ email: 'fulano@email.com', name: 'fulano' });
        expect(generateSpy).toHaveBeenCalledWith(expect.stringMatching('.'));
    });
});
