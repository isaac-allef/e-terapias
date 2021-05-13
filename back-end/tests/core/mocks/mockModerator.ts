/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import Moderator from '../../../src/core/entities/Moderator';
import UploadModeratorsListRepository from '../../../src/core/protocols/db/repositories/UploadModeratorsListRepository';
import LoadModeratorByIdRepository from '../../../src/core/protocols/db/repositories/LoadModeratorByIdRepository';

export class UploadModeratorsListRepositoryStub
    implements UploadModeratorsListRepository {
    async upload(): Promise<Moderator[]> {
        const moderator1: Moderator = {
            id: 'randomId1',
            email: 'fulano@email.com',
            name: 'fulano',
            etherapies: [],
            fieldJournals: [],
            password: '1234',
            token: 'randomToken1',
            role: '',
        };

        const moderator2: Moderator = {
            id: 'randomId2',
            email: 'sicrano@email.com',
            name: 'sicrano',
            etherapies: [],
            fieldJournals: [],
            password: '1234',
            token: 'randomToken2',
            role: '',
        };

        const moderators = [moderator1, moderator2];

        return new Promise(resolve => resolve(moderators));
    }
}

export class LoadModeratorByIdRepositoryStub
    implements LoadModeratorByIdRepository {
    async load(id: string): Promise<Moderator> {
        const moderator: Moderator = {
            id,
            email: 'fulano@email.com',
            name: 'fulano',
            etherapies: [],
            fieldJournals: [],
            password: '1234',
            token: 'randomToken',
            role: '',
        };

        return new Promise(resolve => resolve(moderator));
    }
}
