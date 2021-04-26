import Moderator from '../../../../../core/entities/Moderator';
import CreateModeratorRepository from '../../../../../core/protocols/db/repositories/CreateModeratorRepository';
import ModeratorFake from '../../entities/Fakes/ModeratorFake';

class CreateModeratorFakeRepository implements CreateModeratorRepository {
    async create(name: string): Promise<Moderator> {
        const moderator = new ModeratorFake(name);

        return moderator;
    }
}

export default CreateModeratorFakeRepository;
