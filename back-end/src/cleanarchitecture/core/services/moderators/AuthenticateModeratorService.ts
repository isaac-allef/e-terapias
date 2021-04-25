import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';
import HashComparer from '../../protocols/cryptography/HashComparer';
import TokenGenerater from '../../protocols/Token/TokenGenerater';
import Moderator from '../../entities/Moderator';
import ModeratorRepository from '../../protocols/db/repositories/ModeratorRepository';

interface Request {
    email: string;
    password: string;
}

interface Response {
    moderator: Moderator;
    token: string;
}

class AuthenticateModeratorService {
    constructor(
        private moderatorRepository: ModeratorRepository,
        private hashComparer: HashComparer,
        private tokenGenerater: TokenGenerater,
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const moderator = await this.moderatorRepository.findByEmail({ email });

        if (!moderator) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await this.hashComparer.compare(
            password,
            moderator.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwtModerator;

        const token = this.tokenGenerater.generate({
            secret,
            subject: moderator.id,
            expiresIn,
        });

        return {
            moderator,
            token,
        };
    }
}

export default AuthenticateModeratorService;
