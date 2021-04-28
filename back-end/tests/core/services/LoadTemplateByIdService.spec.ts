/* eslint-disable max-classes-per-file */
import LoadTemplateByIdService from '../../../src/core/services/LoadTemplateByIdService';
import LoadTemplateByIdRepository from '../../../src/core/protocols/db/repositories/LoadTemplateByIdRepository';
import Template from '../../../src/core/entities/Template';

const makeLoadTemplateByIdRepository = (): LoadTemplateByIdRepository => {
    class LoadTemplateByIdRepositoryStub implements LoadTemplateByIdRepository {
        async load(): Promise<Template> {
            const template: Template = {
                id: 'randomId',
                name: 'viver é bom',
                etherapies: [],
                templateFields: [
                    { name: 'Qual o seu nome?' },
                    { name: 'Quanto é 2 + 2?' },
                    {
                        name: 'Informe sua data de nascimento',
                    },
                    { name: 'Voçê é estudante?' },
                ],
            };

            return new Promise(resolve => resolve(template));
        }
    }

    return new LoadTemplateByIdRepositoryStub();
};

interface SutTypes {
    sut: LoadTemplateByIdService;
    loadTemplateByIdRepository: LoadTemplateByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadTemplateByIdRepository = makeLoadTemplateByIdRepository();
    const sut = new LoadTemplateByIdService(loadTemplateByIdRepository);
    return {
        sut,
        loadTemplateByIdRepository,
    };
};

describe('load Template by id usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute('randomId');
        expect(executeSpy).toHaveBeenCalledWith('randomId');
    });

    test('Should call LoadTemplateByIdRepository with correct values', async () => {
        const { sut, loadTemplateByIdRepository } = makeSut();
        const loadSpy = jest.spyOn(loadTemplateByIdRepository, 'load');
        await sut.execute('randomId');
        expect(loadSpy).toHaveBeenCalledWith('randomId');
    });
});
