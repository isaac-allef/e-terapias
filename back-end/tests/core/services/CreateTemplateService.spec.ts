/* eslint-disable max-classes-per-file */
import CreateTemplateService from '../../../src/core/services/CreateTemplateService';
import CreateTemplateRepository from '../../../src/core/protocols/db/repositories/CreateTemplateRepository';
import {
    CreateTemplateRepositoryStub,
    LinkTemplateToEtherapiesRepositoryStub,
} from '../mocks/mockTemplate';
import { templateField } from '../../../src/core/entities/Template';
import LinkTemplateToEtherapiesRepository from '../../../src/core/protocols/db/repositories/LinkTemplateToEtherapiesRepository';

interface SutTypes {
    sut: CreateTemplateService;
    createTemplateRepository: CreateTemplateRepository;
    linkTemplateToEtherapiesRepository: LinkTemplateToEtherapiesRepository;
}

const makeSut = (): SutTypes => {
    const createTemplateRepository = new CreateTemplateRepositoryStub();
    const linkTemplateToEtherapiesRepository = new LinkTemplateToEtherapiesRepositoryStub();
    const sut = new CreateTemplateService(
        createTemplateRepository,
        linkTemplateToEtherapiesRepository,
    );
    return {
        sut,
        createTemplateRepository,
        linkTemplateToEtherapiesRepository,
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
            etherapiesIds: ['randomIdEtherapy1', 'randomIdEtherapy2'],
        });
        expect(executeSpy).toHaveBeenCalledWith({
            name: 'diário das eterapias de promoção ao bem-estar',
            templateFields: fakeTemplateFields,
            etherapiesIds: ['randomIdEtherapy1', 'randomIdEtherapy2'],
        });
    });

    test('Should call CreateTemplateRepository with correct values', async () => {
        const { sut, createTemplateRepository } = makeSut();
        const createSpy = jest.spyOn(createTemplateRepository, 'create');
        await sut.execute({
            name: 'diário das eterapias de promoção ao bem-estar',
            templateFields: fakeTemplateFields,
            etherapiesIds: ['randomIdEtherapy1', 'randomIdEtherapy2'],
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
                etherapiesIds: ['randomIdEtherapy1', 'randomIdEtherapy2'],
            }),
        ).rejects.toThrow();
    });
});
