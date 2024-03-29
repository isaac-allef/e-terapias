import User from '../entities/User';
import LoadUserByEmailRepository from '../protocols/db/repositories/LoadUserByEmailRepository';
import UpdateAccessTokenRepository from '../protocols/db/repositories/UpdateAccessTokenRepository';
import TokenGenerater from '../protocols/Token/TokenGenerater';
import HashComparer from '../protocols/cryptography/HashComparer';

class AuthenticationService {
    constructor(
        private loadUserByEmailRepository: LoadUserByEmailRepository,
        private hashComparer: HashComparer,
        private tokenGenerater: TokenGenerater,
        private updateAccessTokenRepository: UpdateAccessTokenRepository,
    ) {}

    public async execute(
        email: string,
        password: string,
    ): Promise<User | null> {
        const user = await this.loadUserByEmailRepository.loadByEmail(email);

        if (!(await this.hashComparer.compare(password, user.password))) {
            return null;
        }

        const token = await this.tokenGenerater.generate(user.id);

        const userUpdatedToken = await this.updateAccessTokenRepository.updateAccessToken(
            user.id,
            token,
        );

        return userUpdatedToken;
    }
}

export default AuthenticationService;
