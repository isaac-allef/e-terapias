import Moderator from '../../../entities/Moderator';

export default interface CreateModeratorRepository {
    create(name: string): Promise<Moderator>;
}
