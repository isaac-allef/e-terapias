import Moderator from '../../../entities/Moderator';

export default interface LoadModeratorByIdRepository {
    loadByEmail(email: string): Promise<Moderator>;
}
