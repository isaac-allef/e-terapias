/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import Moderator from '../../../src/core/entities/Moderator';
import CreateModeratorRepository from '../../../src/core/protocols/db/repositories/CreateModeratorRepository';
import LoadModeratorByIdRepository from '../../../src/core/protocols/db/repositories/LoadModeratorByIdRepository';

export class CreateModeratorRepositoryStub
    implements CreateModeratorRepository {
    async create(): Promise<Moderator> {
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
