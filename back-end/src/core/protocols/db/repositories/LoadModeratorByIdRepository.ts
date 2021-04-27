import Moderator from '../../../entities/Moderator';

export default interface LoadModeratorByIdRepository {
    load(id: string): Promise<Moderator>;
}
