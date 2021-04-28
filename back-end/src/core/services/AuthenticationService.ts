import Moderator from '../entities/Moderator';
import AppError from '../errors/AppError';
import LoadModeratorByEmailRepository from '../protocols/db/repositories/LoadModeratorByEmailRepository';
import UpdateAccessTokenRepository from '../protocols/db/repositories/UpdateAccessTokenRepository';
// import TokenGenerater from '../protocols/Token/TokenGenerater';

class AuthenticationService {
    constructor(
        private loadModeratorByEmailRepository: LoadModeratorByEmailRepository,
        private updateAccessTokenRepository: UpdateAccessTokenRepository, // private tokenGenerater: TokenGenerater,
    ) {}

    public async execute(email: string, password: string): Promise<Moderator> {
        const moderator = await this.loadModeratorByEmailRepository.loadByEmail(
            email,
        );

        if (!moderator || moderator.password !== password) {
            throw new AppError('Incorrect email or password.');
        }

        // const token = this.tokenGenerater.generate({
        //     secret: 'aaaa',
        //     subject: 'bbbb',
        //     expiresIn: '1d',
        // });

        const token = 'aslkdfjldaskfjl';

        const moderatorUpdatedToken = await this.updateAccessTokenRepository.updateAccessToken(
            moderator.id,
            token,
        );

        return moderatorUpdatedToken;
    }
}

export default AuthenticationService;
