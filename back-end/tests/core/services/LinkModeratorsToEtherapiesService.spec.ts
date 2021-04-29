/* eslint-disable max-classes-per-file */

import LinkModeratorsToEtherapiesService from '../../../src/core/services/LinkModeratorsToEtherapiesService';
import LinkModeratorToEtherapyRepository from '../../../src/core/protocols/db/repositories/LinkModeratorToEtherapyRepository';
import LoadModeratorByIdRepository from '../../../src/core/protocols/db/repositories/LoadModeratorByIdRepository';
import LoadEtherapyByIdRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdRepository';
import { LinkModeratorToEtherapyRepositoryStub } from '../mocks/mockLink';
import { LoadModeratorByIdRepositoryStub } from '../mocks/mockModerator';
import { LoadEtherapyByIdRepositoryStub } from '../mocks/mockEtherapy';

interface SutTypes {
    sut: LinkModeratorsToEtherapiesService;
    linkModeratorToEtherapyRepository: LinkModeratorToEtherapyRepository;
    loadModeratorByIdRepository: LoadModeratorByIdRepository;
    loadEtherapyByIdRepository: LoadEtherapyByIdRepository;
}

const makeSut = (): SutTypes => {
    const linkModeratorToEtherapyRepository = new LinkModeratorToEtherapyRepositoryStub();
    const loadModeratorByIdRepository = new LoadModeratorByIdRepositoryStub();
    const loadEtherapyByIdRepository = new LoadEtherapyByIdRepositoryStub();
    const sut = new LinkModeratorsToEtherapiesService(
        linkModeratorToEtherapyRepository,
        loadModeratorByIdRepository,
        loadEtherapyByIdRepository,
    );
    return {
        sut,
        linkModeratorToEtherapyRepository,
        loadModeratorByIdRepository,
        loadEtherapyByIdRepository,
    };
};

describe('Link moderators to etherapies usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute([
            {
                moderatorId: 'randomIdModerator1',
                etherapyId: 'randomIdEtherapy1',
            },
            {
                moderatorId: 'randomIdModerator2',
                etherapyId: 'randomIdEtherapy2',
            },
        ]);
        expect(executeSpy).toHaveBeenCalledWith([
            {
                moderatorId: 'randomIdModerator1',
                etherapyId: 'randomIdEtherapy1',
            },
            {
                moderatorId: 'randomIdModerator2',
                etherapyId: 'randomIdEtherapy2',
            },
        ]);
    });
});
