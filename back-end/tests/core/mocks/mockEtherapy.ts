/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import Etherapy from '../../../src/core/entities/Etherapy';
import CreateEtherapiesRepository from '../../../src/core/protocols/db/repositories/CreateEtherapiesRepository';
import LoadEtherapyByIdRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdRepository';

export class CreateEtherapiesRepositoryStub
    implements CreateEtherapiesRepository {
    async create(): Promise<Etherapy[]> {
        const etherapy1: Etherapy = {
            id: 'randomId1',
            name: 'viver é bom',
            fieldJournals: [],
            moderators: [],
            template: undefined,
        };

        const etherapy2: Etherapy = {
            id: 'randomId2',
            name: 'não desista',
            fieldJournals: [],
            moderators: [],
            template: undefined,
        };

        const etherapies = [etherapy1, etherapy2];

        return new Promise(resolve => resolve(etherapies));
    }
}

export class LoadEtherapyByIdRepositoryStub
    implements LoadEtherapyByIdRepository {
    async load(id: string): Promise<Etherapy> {
        const etherapy: Etherapy = {
            id,
            name: 'viver é bom',
            fieldJournals: [],
            moderators: [],
            template: undefined,
        };

        return new Promise(resolve => resolve(etherapy));
    }
}
