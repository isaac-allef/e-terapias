import Moderator from '../../../entities/Moderator';

export default interface UpdateAccessTokenRepository {
    updateAccessToken(id: string, token: string): Promise<Moderator>;
}
