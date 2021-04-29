/* eslint-disable max-classes-per-file */
import LoadModeratorByIdService from '../../../src/core/services/LoadModeratorByIdService';
import LoadModeratorByIdRepository from '../../../src/core/protocols/db/repositories/LoadModeratorByIdRepository';
import { LoadModeratorByIdRepositoryStub } from '../mocks/mockModerator';
import AppError from '../../../src/core/errors/AppError';

interface SutTypes {
    sut: LoadModeratorByIdService;
    loadModeratorByIdRepository: LoadModeratorByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadModeratorByIdRepository = new LoadModeratorByIdRepositoryStub();
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

    test('Should throw AppError if LoadModeratorByIdRepository return undefined', async () => {
        const { sut, loadModeratorByIdRepository } = makeSut();
        jest.spyOn(loadModeratorByIdRepository, 'load').mockReturnValue(
            new Promise(resolve => resolve(undefined)),
        );

        try {
            await sut.execute('randomId');
            expect('biscoito').toBe('bolacha');
        } catch (err) {
            expect(err).toEqual(new AppError('Moderator not found.'));
        }
    });
});
