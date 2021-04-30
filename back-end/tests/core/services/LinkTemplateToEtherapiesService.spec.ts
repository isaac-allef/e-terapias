/* eslint-disable max-classes-per-file */

import LinkTemplateToEtherapiesService from '../../../src/core/services/LinkTemplateToEtherapiesService';
import LinkTemplateToEtherapiesRepository from '../../../src/core/protocols/db/repositories/LinkTemplateToEtherapiesRepository';
import LoadTemplateByIdRepository from '../../../src/core/protocols/db/repositories/LoadTemplateByIdRepository';
import LoadEtherapyByIdRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdRepository';
import {
    LoadTemplateByIdRepositoryStub,
    LinkTemplateToEtherapiesRepositoryStub,
} from '../mocks/mockTemplate';
import { LoadEtherapyByIdRepositoryStub } from '../mocks/mockEtherapy';

interface SutTypes {
    sut: LinkTemplateToEtherapiesService;
    linkTemplateToEtherapiesRepository: LinkTemplateToEtherapiesRepository;
    loadTemplateByIdRepository: LoadTemplateByIdRepository;
    loadEtherapyByIdRepository: LoadEtherapyByIdRepository;
}

const makeSut = (): SutTypes => {
    const linkTemplateToEtherapiesRepository = new LinkTemplateToEtherapiesRepositoryStub();
    const loadTemplateByIdRepository = new LoadTemplateByIdRepositoryStub();
    const loadEtherapyByIdRepository = new LoadEtherapyByIdRepositoryStub();
    const sut = new LinkTemplateToEtherapiesService(
        linkTemplateToEtherapiesRepository,
        loadTemplateByIdRepository,
        loadEtherapyByIdRepository,
    );
    return {
        sut,
        linkTemplateToEtherapiesRepository,
        loadTemplateByIdRepository,
        loadEtherapyByIdRepository,
    };
};

describe('Link Template to etherapies usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute('randomIdTemplate', [
            'randomIdEtherapy1',
            'randomIdEtherapy2',
        ]);
        expect(executeSpy).toHaveBeenCalledWith('randomIdTemplate', [
            'randomIdEtherapy1',
            'randomIdEtherapy2',
        ]);
    });

    test('Should call LoadTemplateByIdRepository with correct values', async () => {
        const { sut, loadTemplateByIdRepository } = makeSut();
        const loadSpy = jest.spyOn(loadTemplateByIdRepository, 'load');
        await sut.execute('randomIdTemplate', [
            'randomIdEtherapy1',
            'randomIdEtherapy2',
        ]);
        expect(loadSpy).toHaveBeenCalledWith('randomIdTemplate');
    });

    test('Should call LoadEtherapyByIdRepository with correct values', async () => {
        const { sut, loadEtherapyByIdRepository } = makeSut();
        const loadSpy = jest.spyOn(loadEtherapyByIdRepository, 'load');
        await sut.execute('randomIdTemplate', [
            'randomIdEtherapy1',
            'randomIdEtherapy2',
        ]);
        expect(loadSpy).toHaveBeenCalledWith('randomIdEtherapy1');
        expect(loadSpy).toHaveBeenCalledWith('randomIdEtherapy2');
    });

    test('Should throw if LoadTemplateByIdRepository throws', async () => {
        const { sut, loadTemplateByIdRepository } = makeSut();
        jest.spyOn(loadTemplateByIdRepository, 'load').mockImplementationOnce(
            () => {
                throw new Error('Random error');
            },
        );

        expect(
            sut.execute('randomIdTemplate', [
                'randomIdEtherapy1',
                'randomIdEtherapy2',
            ]),
        ).rejects.toThrow();
    });

    test('Should throw if LoadEtherapyByIdRepository throws', async () => {
        const { sut, loadEtherapyByIdRepository } = makeSut();
        jest.spyOn(loadEtherapyByIdRepository, 'load').mockImplementationOnce(
            () => {
                throw new Error('Random error');
            },
        );

        expect(
            sut.execute('randomIdTemplate', [
                'randomIdEtherapy1',
                'randomIdEtherapy2',
            ]),
        ).rejects.toThrow();
    });
});
