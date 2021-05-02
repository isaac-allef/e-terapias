import User from '../../../entities/User';

export default interface UpdateAccessTokenRepository {
    updateAccessToken(id: string, token: string): Promise<User>;
}
