import User from '../../../entities/User';

export default interface LoadUserByTokenRepository {
    loadByToken(accessToken: string, role?: string): Promise<User>;
}
