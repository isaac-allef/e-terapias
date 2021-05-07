import User from '../entities/User';
import TokenDecodeder from '../protocols/Token/TokenDecodeder';
import LoadUserByTokenRepository from '../protocols/db/repositories/LoadUserByTokenRepository';

class LoadUserByTokenService {
    constructor(
        private tokenDecodeder: TokenDecodeder,
        private loadUserByTokenRepository: LoadUserByTokenRepository,
    ) {}

    public async execute(accessToken: string, role?: string): Promise<User> {
        await this.tokenDecodeder.decode(accessToken);

        const user = await this.loadUserByTokenRepository.loadByToken(
            accessToken,
            role,
        );

        return user;
    }
}

export default LoadUserByTokenService;
