import User from '../../../entities/User';

export default interface LoadUserByEmailRepository {
    loadByEmail(email: string): Promise<User>;
}
