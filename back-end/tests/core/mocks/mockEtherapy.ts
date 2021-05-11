/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import Etherapy from '../../../src/core/entities/Etherapy';
import CreateEtherapiesRepository from '../../../src/core/protocols/db/repositories/CreateEtherapiesRepository';
import LoadEtherapyByIdRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdRepository';
import LoadEtherapyByIdentifierRepository from '../../../src/core/protocols/db/repositories/LoadEtherapyByIdentifierRepository';
import LoadAllEtherapiesRepository from '../../../src/core/protocols/db/repositories/LoadAllEtherapiesRepository';
import SearchEtherapiesRepository from '../../../src/core/protocols/db/repositories/SearchEtherapiesRepository';
import LoadManyEtherapiesByIdentifierRepository from '../../../src/core/protocols/db/repositories/LoadManyEtherapiesByIdentifierRepository';

export class CreateEtherapiesRepositoryStub
    implements CreateEtherapiesRepository {
    async create(): Promise<Etherapy[]> {
        const etherapy1: Etherapy = {
            id: 'randomId1',
            identifier: 'any_identifier',
            name: 'viver é bom',
            fieldJournals: [],
            moderators: [],
            template: undefined,
        };

        const etherapy2: Etherapy = {
            id: 'randomId2',
            identifier: 'any_identifier',
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
            identifier: 'any_identifier',
            name: 'viver é bom',
            fieldJournals: [],
            moderators: [],
            template: undefined,
        };

        return new Promise(resolve => resolve(etherapy));
    }
}

export class LoadAllEtherapiesRepositoryStub
    implements LoadAllEtherapiesRepository {
    loadAll(): Promise<Etherapy[]> {
        const etherapies: Etherapy[] = [
            {
                id: 'randomId1',
                identifier: 'any_identifier',
                name: 'viver é bom',
                fieldJournals: [],
                moderators: [],
                template: undefined,
            },
            {
                id: 'randomId2',
                identifier: 'any_identifier',
                name: 'não desista',
                fieldJournals: [],
                moderators: [],
                template: undefined,
            },
        ];

        return new Promise(resolve => resolve(etherapies));
    }
}

export class SearchEtherapiesRepositoryStub
    implements SearchEtherapiesRepository {
    search(): Promise<Etherapy[]> {
        const etherapies: Etherapy[] = [
            {
                id: 'randomId1',
                identifier: 'any_identifier',
                name: 'viver é bom',
                fieldJournals: [],
                moderators: [],
                template: undefined,
            },
            {
                id: 'randomId2',
                identifier: 'any_identifier',
                name: 'não desista',
                fieldJournals: [],
                moderators: [],
                template: undefined,
            },
        ];

        return new Promise(resolve => resolve(etherapies));
    }
}

export class LoadEtherapyByIdentifierRepositoryStub
    implements LoadEtherapyByIdentifierRepository {
    async loadByIdentifier(identifier: string): Promise<Etherapy> {
        const etherapy: Etherapy = {
            id: 'randomId',
            identifier,
            name: 'viver é bom',
            fieldJournals: [],
            moderators: [],
            template: undefined,
        };

        return new Promise(resolve => resolve(etherapy));
    }
}

export class LoadManyEtherapiesByIdentifiersRepositoryStub
    implements LoadManyEtherapiesByIdentifierRepository {
    loadManyByIdentifiers(_identifiers: string[]): Promise<Etherapy[]> {
        const etherapies: Etherapy[] = [];

        return new Promise(resolve => resolve(etherapies));
    }
}
