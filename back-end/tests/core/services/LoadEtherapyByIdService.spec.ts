/* eslint-disable max-classes-per-file */
import LoadEtherapyByIdService from '../../../src/core/services/LoadEtherapyByIdService';
import LoadEtherapyByIdRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdRepository';
import { LoadEtherapyByIdRepositoryStub } from '../mocks/mockEtherapy';

interface SutTypes {
    sut: LoadEtherapyByIdService;
    loadEtherapyByIdRepository: LoadEtherapyByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadEtherapyByIdRepository = new LoadEtherapyByIdRepositoryStub();
    const sut = new LoadEtherapyByIdService(loadEtherapyByIdRepository);
    return {
        sut,
        loadEtherapyByIdRepository,
    };
};

describe('load Etherapy by id usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute('randomId');
        expect(executeSpy).toHaveBeenCalledWith('randomId');
    });

    test('Should call LoadEtherapyByIdRepository with correct values', async () => {
        const { sut, loadEtherapyByIdRepository } = makeSut();
        const loadSpy = jest.spyOn(loadEtherapyByIdRepository, 'load');
        await sut.execute('randomId');
        expect(loadSpy).toHaveBeenCalledWith('randomId');
    });

    test('Should throw if LoadEtherapyByIdRepository throws', async () => {
        const { sut, loadEtherapyByIdRepository } = makeSut();
        jest.spyOn(loadEtherapyByIdRepository, 'load').mockImplementationOnce(
            () => {
                throw new Error('Random error');
            },
        );
        expect(sut.execute('randomId')).rejects.toThrow();
    });
});
