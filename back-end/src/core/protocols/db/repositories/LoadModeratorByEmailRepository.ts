import Moderator from '../../../entities/Moderator';

export default interface LoadModeratorByEmailRepository {
    loadByEmail(email: string): Promise<Moderator>;
}
