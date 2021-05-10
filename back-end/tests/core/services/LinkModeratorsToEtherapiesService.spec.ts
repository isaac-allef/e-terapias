/* eslint-disable max-classes-per-file */

import LinkModeratorsToEtherapiesService from '../../../src/core/services/LinkModeratorsToEtherapiesService';
import LinkModeratorsToEtherapiesRepository from '../../../src/core/protocols/db/repositories/LinkModeratorsToEtherapiesRepository';
import LoadModeratorByEmailRepository from '../../../src/core/protocols/db/repositories/LoadModeratorByEmailRepository';
import { LinkModeratorsToEtherapiesRepositoryStub } from '../mocks/mockLink';
import { LoadModeratorByEmailRepositoryStub } from '../mocks/mockModerator';

interface SutTypes {
    sut: LinkModeratorsToEtherapiesService;
    linkModeratorsToEtherapiesRepository: LinkModeratorsToEtherapiesRepository;
    loadModeratorByEmailRepository: LoadModeratorByEmailRepository;
}

const makeSut = (): SutTypes => {
    const linkModeratorsToEtherapiesRepository = new LinkModeratorsToEtherapiesRepositoryStub();
    const loadModeratorByEmailRepository = new LoadModeratorByEmailRepositoryStub();
    const sut = new LinkModeratorsToEtherapiesService(
        linkModeratorsToEtherapiesRepository,
        loadModeratorByEmailRepository,
    );
    return {
        sut,
        linkModeratorsToEtherapiesRepository,
        loadModeratorByEmailRepository,
    };
};

describe('Link moderators to etherapies usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute([
            {
                moderatorEmail: 'randomIdModerator1',
                etherapyIdentifier: 'randomIdEtherapy1',
            },
            {
                moderatorEmail: 'randomIdModerator2',
                etherapyIdentifier: 'randomIdEtherapy2',
            },
        ]);
        expect(executeSpy).toHaveBeenCalledWith([
            {
                moderatorEmail: 'randomIdModerator1',
                etherapyIdentifier: 'randomIdEtherapy1',
            },
            {
                moderatorEmail: 'randomIdModerator2',
                etherapyIdentifier: 'randomIdEtherapy2',
            },
        ]);
    });

    test('Should call LoadModeratorByEmailRepository with correct moderator id', async () => {
        const { sut, loadModeratorByEmailRepository } = makeSut();
        const loadSpy = jest.spyOn(
            loadModeratorByEmailRepository,
            'loadByEmail',
        );
        await sut.execute([
            {
                moderatorEmail: 'randomIdModerator1',
                etherapyIdentifier: 'randomIdEtherapy1',
            },
            {
                moderatorEmail: 'randomIdModerator2',
                etherapyIdentifier: 'randomIdEtherapy2',
            },
        ]);
        expect(loadSpy).toHaveBeenCalledWith('randomIdModerator1');
        expect(loadSpy).toHaveBeenCalledWith('randomIdModerator2');
    });

    test('Should throw if LoadModeratorByEmailRepository throws', async () => {
        const { sut, loadModeratorByEmailRepository } = makeSut();
        jest.spyOn(
            loadModeratorByEmailRepository,
            'loadByEmail',
        ).mockImplementationOnce(() => {
            throw new Error('Random error');
        });

        await expect(
            sut.execute([
                {
                    moderatorEmail: 'randomIdModerator1',
                    etherapyIdentifier: 'randomIdEtherapy1',
                },
                {
                    moderatorEmail: 'randomIdModerator2',
                    etherapyIdentifier: 'randomIdEtherapy2',
                },
            ]),
        ).rejects.toThrow();
    });
});
