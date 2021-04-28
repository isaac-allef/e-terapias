/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import Etherapy from '../../../src/core/entities/Etherapy';
import CreateEtherapyRepository from '../../../src/core/protocols/db/repositories/CreateEtherapyRepository';
import LoadEtherapyByIdRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdRepository';

export class CreateEtherapyRepositoryStub implements CreateEtherapyRepository {
    async create(): Promise<Etherapy> {
        const etherapy: Etherapy = {
            id: 'randomId',
            name: 'viver é bom',
            fieldJournals: [],
            moderators: [],
            template: undefined,
        };

        return new Promise(resolve => resolve(etherapy));
    }
}

export class LoadEtherapyByIdRepositoryStub
    implements LoadEtherapyByIdRepository {
    async load(): Promise<Etherapy> {
        const etherapy: Etherapy = {
            id: 'randomId',
            name: 'viver é bom',
            fieldJournals: [],
            moderators: [],
            template: undefined,
        };

        return new Promise(resolve => resolve(etherapy));
    }
}
