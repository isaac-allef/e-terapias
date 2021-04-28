import Moderator from '../../../../../core/entities/Moderator';
import CreateModeratorRepository from '../../../../../core/protocols/db/repositories/CreateModeratorRepository';
import ModeratorFake from '../../entities/Fakes/ModeratorFake';

class CreateModeratorFakeRepository implements CreateModeratorRepository {
    async create(email: string, name: string): Promise<Moderator> {
        const moderator = new ModeratorFake(email, name);

        return moderator;
    }
}

export default CreateModeratorFakeRepository;
