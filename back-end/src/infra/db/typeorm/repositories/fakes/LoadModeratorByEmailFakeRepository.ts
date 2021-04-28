import Moderator from '../../../../../core/entities/Moderator';
import LoadModeratorByEmailRepository from '../../../../../core/protocols/db/repositories/LoadModeratorByEmailRepository';
import ModeratorFake from '../../entities/Fakes/ModeratorFake';

class LoadModeratorByIdFakeRepository
    implements LoadModeratorByEmailRepository {
    async loadByEmail(email: string): Promise<Moderator> {
        const moderator = new ModeratorFake(
            'moderator@email.com',
            'load moderator',
        );

        moderator.email = email;
        moderator.password = '1234';

        return moderator;
    }
}

export default LoadModeratorByIdFakeRepository;
