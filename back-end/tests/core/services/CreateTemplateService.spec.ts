/* eslint-disable max-classes-per-file */
import CreateTemplateService from '../../../src/core/services/CreateTemplateService';
import CreateTemplateRepository from '../../../src/core/protocols/db/repositories/CreateTemplateRepository';
import { CreateTemplateRepositoryStub } from '../mocks/mockTemplate';
import { templateField } from '../../../src/core/entities/Template';

interface SutTypes {
    sut: CreateTemplateService;
    createTemplateRepository: CreateTemplateRepository;
}

const makeSut = (): SutTypes => {
    const createTemplateRepository = new CreateTemplateRepositoryStub();
    const sut = new CreateTemplateService(createTemplateRepository);
    return {
        sut,
        createTemplateRepository,
    };
};

const fakeTemplateFields: templateField[] = [
    { name: 'Qual o seu nome?', type: 'short' },
    { name: 'Fale sobre você', type: 'long' },
];

describe('Create Template usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute({
            name: 'diário das eterapias de promoção ao bem-estar',
            templateFields: fakeTemplateFields,
        });
        expect(executeSpy).toHaveBeenCalledWith({
            name: 'diário das eterapias de promoção ao bem-estar',
            templateFields: fakeTemplateFields,
        });
    });

    test('Should call CreateTemplateRepository with correct values', async () => {
        const { sut, createTemplateRepository } = makeSut();
        const createSpy = jest.spyOn(createTemplateRepository, 'create');
        await sut.execute({
            name: 'diário das eterapias de promoção ao bem-estar',
            templateFields: fakeTemplateFields,
        });
        expect(createSpy).toHaveBeenCalledWith({
            name: 'diário das eterapias de promoção ao bem-estar',
            templateFields: fakeTemplateFields,
        });
    });

    test('Should throw if CreateTemplateRepository throws', async () => {
        const { sut, createTemplateRepository } = makeSut();
        jest.spyOn(createTemplateRepository, 'create').mockImplementationOnce(
            () => {
                throw new Error('Random error');
            },
        );

        await expect(
            sut.execute({
                name: 'diário das eterapias de promoção ao bem-estar',
                templateFields: fakeTemplateFields,
            }),
        ).rejects.toThrow();
    });
});
