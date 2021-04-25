import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';
import HashComparer from '../../protocols/cryptography/HashComparer';
import TokenGenerater from '../../protocols/Token/TokenGenerater';
import Administrator from '../../entities/Administrator';
import AdministratorRepository from '../../protocols/db/repositories/AdministratorRepository';

interface Request {
    email: string;
    password: string;
}

interface Response {
    administrator: Administrator;
    token: string;
}

class AuthenticateAdministratorService {
    constructor(
        private administratorRepository: AdministratorRepository,
        private hashComparer: HashComparer,
        private tokenGenerater: TokenGenerater,
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const administrator = await this.administratorRepository.findByEmail(
            email,
        );

        if (!administrator) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await this.hashComparer.compare(
            password,
            administrator.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = this.tokenGenerater.generate({
            secret,
            subject: administrator.id,
            expiresIn,
        });

        return {
            administrator,
            token,
        };
    }
}

export default AuthenticateAdministratorService;
