/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import User from '../../../src/core/entities/User';
import LoadUserByEmailRepository from '../../../src/core/protocols/db/repositories/LoadUserByEmailRepository';
import UpdateAccessTokenRepository from '../../../src/core/protocols/db/repositories/UpdateAccessTokenRepository';
import LoadUserByTokenRepository from '../../../src/core/protocols/db/repositories/LoadUserByTokenRepository';

export class LoadUserByEmailRepositoryStub
    implements LoadUserByEmailRepository {
    async loadByEmail(email: string): Promise<User> {
        const user: User = {
            id: 'randomIdUser',
            email,
            password: 'any_password',
            token: 'randomToken',
            role: '',
        };

        return new Promise(resolve => resolve(user));
    }
}

export class UpdateAccessTokenRepositoryStub
    implements UpdateAccessTokenRepository {
    updateAccessToken(id: string, token: string): Promise<User> {
        const user: User = {
            id,
            email: 'any_email@email.com',
            password: 'any_password',
            token,
            role: '',
        };

        return new Promise(resolve => resolve(user));
    }
}

export class LoadUserByTokenRepositoryStub
    implements LoadUserByTokenRepository {
    async loadByToken(accessToken: string, _role?: string): Promise<User> {
        const user: User = {
            id: 'randomIdUser',
            email: 'any_email@email.com',
            password: 'any_password',
            token: accessToken,
            role: '',
        };

        return new Promise(resolve => resolve(user));
    }
}
