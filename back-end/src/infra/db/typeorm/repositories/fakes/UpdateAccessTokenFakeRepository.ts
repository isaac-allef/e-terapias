import Moderator from '../../../../../core/entities/Moderator';
import UpdateAccessTokenRepository from '../../../../../core/protocols/db/repositories/UpdateAccessTokenRepository';
import ModeratorFake from '../../entities/Fakes/ModeratorFake';

class UpdateAccessTokenFakeRepository implements UpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<Moderator> {
        const moderator = new ModeratorFake(
            'moderator@email.com',
            'moderator updated token',
        );

        moderator.id = id;
        moderator.token = token;

        return moderator;
    }
}

export default UpdateAccessTokenFakeRepository;
