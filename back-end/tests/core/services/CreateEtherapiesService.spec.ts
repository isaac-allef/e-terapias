/* eslint-disable max-classes-per-file */
import UploadEtherapiesListService from '../../../src/core/services/UploadEtherapiesListService';
import UploadEtherapiesListRepository from '../../../src/core/protocols/db/repositories/UploadEtherapiesListRepository';
import { UploadEtherapiesListRepositoryStub } from '../mocks/mockEtherapy';

interface SutTypes {
    sut: UploadEtherapiesListService;
    uploadEtherapiesListRepository: UploadEtherapiesListRepository;
}

const makeSut = (): SutTypes => {
    const uploadEtherapiesListRepository = new UploadEtherapiesListRepositoryStub();
    const sut = new UploadEtherapiesListService(uploadEtherapiesListRepository);
    return {
        sut,
        uploadEtherapiesListRepository,
    };
};

describe('Create Etherapy usecase', () => {
    test('Should call with correct values', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        await sut.execute([
            { identifier: 'any_identifier', name: 'viver é bom' },
            { identifier: 'any_identifier', name: 'não desista' },
        ]);
        expect(executeSpy).toHaveBeenCalledWith([
            { identifier: 'any_identifier', name: 'viver é bom' },
            { identifier: 'any_identifier', name: 'não desista' },
        ]);
    });

    test('Should call UploadEtherapiesListRepository with correct values', async () => {
        const { sut, uploadEtherapiesListRepository } = makeSut();
        const createSpy = jest.spyOn(uploadEtherapiesListRepository, 'upload');
        await sut.execute([
            { identifier: 'any_identifier', name: 'viver é bom' },
            { identifier: 'any_identifier', name: 'não desista' },
        ]);
        expect(createSpy).toHaveBeenCalledWith([
            { identifier: 'any_identifier', name: 'viver é bom' },
            { identifier: 'any_identifier', name: 'não desista' },
        ]);
    });

    test('Should throw if UploadEtherapiesListRepository throws', async () => {
        const { sut, uploadEtherapiesListRepository } = makeSut();
        jest.spyOn(
            uploadEtherapiesListRepository,
            'upload',
        ).mockImplementationOnce(() => {
            throw new Error('Random error');
        });

        await expect(
            sut.execute([
                { identifier: 'any_identifier', name: 'viver é bom' },
                { identifier: 'any_identifier', name: 'não desista' },
            ]),
        ).rejects.toThrow();
    });
});
