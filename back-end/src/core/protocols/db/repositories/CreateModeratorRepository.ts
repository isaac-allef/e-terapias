import Moderator from '../../../entities/Moderator';

export default interface CreateModeratorRepository {
    create(email: string, name: string): Promise<Moderator>;
}
