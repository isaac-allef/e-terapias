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
});
