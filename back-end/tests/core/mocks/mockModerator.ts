/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import Moderator from '../../../src/core/entities/Moderator';
import CreateModeratorsRepository from '../../../src/core/protocols/db/repositories/CreateModeratorsRepository';
import LoadModeratorByIdRepository from '../../../src/core/protocols/db/repositories/LoadModeratorByIdRepository';

export class CreateModeratorsRepositoryStub
    implements CreateModeratorsRepository {
    async create(): Promise<Moderator[] | undefined> {
        const moderator1: Moderator = {
            id: 'randomId1',
            email: 'fulano@email.com',
            name: 'fulano',
            etherapies: [],
            fieldJournals: [],
            password: '1234',
            token: 'randomToken1',
        };

        const moderator2: Moderator = {
            id: 'randomId2',
            email: 'sicrano@email.com',
            name: 'sicrano',
            etherapies: [],
            fieldJournals: [],
            password: '1234',
            token: 'randomToken2',
        };

        const moderators = [moderator1, moderator2];

        return new Promise(resolve => resolve(moderators));
    }
}

export class LoadModeratorByIdRepositoryStub
    implements LoadModeratorByIdRepository {
    async load(): Promise<Moderator> {
        const moderator: Moderator = {
            id: 'randomId',
            email: 'fulano@email.com',
            name: 'fulano',
            etherapies: [],
            fieldJournals: [],
            password: '1234',
            token: 'randomToken',
        };

        return new Promise(resolve => resolve(moderator));
    }
}
