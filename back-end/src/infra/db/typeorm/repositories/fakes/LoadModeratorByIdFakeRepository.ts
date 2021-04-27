import Moderator from '../../../../../core/entities/Moderator';
import LoadModeratorByIdRepository from '../../../../../core/protocols/db/repositories/LoadModeratorByIdRepository';
import ModeratorFake from '../../entities/Fakes/ModeratorFake';

class LoadModeratorByIdFakeRepository implements LoadModeratorByIdRepository {
    async load(id: string): Promise<Moderator> {
        const moderator = new ModeratorFake('load moderator');

        moderator.id = id;

        return moderator;
    }
}

export default LoadModeratorByIdFakeRepository;
