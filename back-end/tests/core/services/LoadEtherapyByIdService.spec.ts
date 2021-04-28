/* eslint-disable max-classes-per-file */
import LoadEtherapyByIdService from '../../../src/core/services/LoadEtherapyByIdService';
import LoadEtherapyByIdRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdRepository';
import Etherapy from '../../../src/core/entities/Etherapy';

const makeLoadEtherapyByIdRepository = (): LoadEtherapyByIdRepository => {
    class LoadEtherapyByIdRepositoryStub implements LoadEtherapyByIdRepository {
        async load(): Promise<Etherapy> {
            const etherapy: Etherapy = {
                id: 'randomId',
                name: 'viver é bom',
                fieldJournals: [],
                moderators: [],
                template: undefined,
            };

            return new Promise(resolve => resolve(etherapy));
        }
    }

    return new LoadEtherapyByIdRepositoryStub();
};

interface SutTypes {
    sut: LoadEtherapyByIdService;
    loadEtherapyByIdRepository: LoadEtherapyByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadEtherapyByIdRepository = makeLoadEtherapyByIdRepository();
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
});
