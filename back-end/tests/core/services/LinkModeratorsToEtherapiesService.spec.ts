/* eslint-disable max-classes-per-file */

import LinkModeratorsToEtherapiesService from '../../../src/core/services/LinkModeratorsToEtherapiesService';
import LinkModeratorsToEtherapiesRepository from '../../../src/core/protocols/db/repositories/LinkModeratorsToEtherapiesRepository';
import LoadModeratorByIdRepository from '../../../src/core/protocols/db/repositories/LoadModeratorByIdRepository';
import LoadEtherapyByIdRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdRepository';
import { LinkModeratorsToEtherapiesRepositoryStub } from '../mocks/mockLink';
import { LoadModeratorByIdRepositoryStub } from '../mocks/mockModerator';
import { LoadEtherapyByIdRepositoryStub } from '../mocks/mockEtherapy';

interface SutTypes {
    sut: LinkModeratorsToEtherapiesService;
    linkModeratorsToEtherapiesRepository: LinkModeratorsToEtherapiesRepository;
    loadModeratorByIdRepository: LoadModeratorByIdRepository;
    loadEtherapyByIdRepository: LoadEtherapyByIdRepository;
}

const makeSut = (): SutTypes => {
    const linkModeratorsToEtherapiesRepository = new LinkModeratorsToEtherapiesRepositoryStub();
    const loadModeratorByIdRepository = new LoadModeratorByIdRepositoryStub();
    const loadEtherapyByIdRepository = new LoadEtherapyByIdRepositoryStub();
    const sut = new LinkModeratorsToEtherapiesService(
        linkModeratorsToEtherapiesRepository,
        loadModeratorByIdRepository,
        loadEtherapyByIdRepository,
    );
    return {
        sut,
        linkModeratorsToEtherapiesRepository,
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

    test('Should call LoadModeratorByIdRepository with correct moderator id', async () => {
        const { sut, loadModeratorByIdRepository } = makeSut();
        const loadSpy = jest.spyOn(loadModeratorByIdRepository, 'load');
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
        expect(loadSpy).toHaveBeenCalledWith('randomIdModerator1');
        expect(loadSpy).toHaveBeenCalledWith('randomIdModerator2');
    });

    test('Should throw AppError if LoadModeratorByIdRepository return undefined', async () => {
        const { sut, loadModeratorByIdRepository } = makeSut();
        jest.spyOn(loadModeratorByIdRepository, 'load').mockImplementationOnce(
            () => {
                throw new Error('Random error');
            },
        );

        expect(
            sut.execute([
                {
                    moderatorId: 'randomIdModerator1',
                    etherapyId: 'randomIdEtherapy1',
                },
                {
                    moderatorId: 'randomIdModerator2',
                    etherapyId: 'randomIdEtherapy2',
                },
            ]),
        ).rejects.toThrow();
    });
});
