/* eslint-disable max-classes-per-file */
import CreateTemplateService from '../../../src/core/services/CreateTemplateService';
import CreateTemplateRepository from '../../../src/core/protocols/db/repositories/CreateTemplateRepository';
import Template from '../../../src/core/entities/Template';

const makeCreateTemplateRepository = (): CreateTemplateRepository => {
    class CreateTemplateRepositoryStub implements CreateTemplateRepository {
        async create(): Promise<Template> {
            const template: Template = {
                id: 'randomId',
                name: 'diário das eterapias de promoção ao bem-estar',
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

    return new CreateTemplateRepositoryStub();
};

interface SutTypes {
    sut: CreateTemplateService;
    createTemplateRepository: CreateTemplateRepository;
}

const makeSut = (): SutTypes => {
    const createTemplateRepository = makeCreateTemplateRepository();
    const sut = new CreateTemplateService(createTemplateRepository);
    return {
        sut,
        createTemplateRepository,
    };
};

describe('Create Template usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({
            name: 'diário das eterapias de promoção ao bem-estar',
            templateFields: [
                { name: 'Qual o seu nome?' },
                { name: 'Quanto é 2 + 2?' },
                {
                    name: 'Informe sua data de nascimento',
                },
                { name: 'Voçê é estudante?' },
            ],
        });
        expect(executeSpy).toHaveBeenCalledWith({
            name: 'diário das eterapias de promoção ao bem-estar',
            templateFields: [
                { name: 'Qual o seu nome?' },
                { name: 'Quanto é 2 + 2?' },
                {
                    name: 'Informe sua data de nascimento',
                },
                { name: 'Voçê é estudante?' },
            ],
        });
    });

    test('Should call CreateTemplateRepository with correct values', async () => {
        const { sut, createTemplateRepository } = makeSut();
        const createSpy = jest.spyOn(createTemplateRepository, 'create');
        await sut.execute({
            name: 'diário das eterapias de promoção ao bem-estar',
            templateFields: [
                { name: 'Qual o seu nome?' },
                { name: 'Quanto é 2 + 2?' },
                {
                    name: 'Informe sua data de nascimento',
                },
                { name: 'Voçê é estudante?' },
            ],
        });
        expect(createSpy).toHaveBeenCalledWith({
            name: 'diário das eterapias de promoção ao bem-estar',
            templateFields: [
                { name: 'Qual o seu nome?' },
                { name: 'Quanto é 2 + 2?' },
                {
                    name: 'Informe sua data de nascimento',
                },
                { name: 'Voçê é estudante?' },
            ],
        });
    });
});
