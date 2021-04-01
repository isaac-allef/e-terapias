import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../../../shared/providers/HashProvider/models/IHashProvider';
import ITokenProvider from '../../../shared/providers/TokenProvider/models/ITokenProvider';
import IAdministrator from '../models/IAdministrator';
import IAdministratorRepository from '../repositories/IAdministratorRepository';

interface Request {
    email: string;
    password: string;
}

interface Response {
    administrator: IAdministrator;
    token: string;
}

class AuthenticateAdministratorService {
    constructor(
        private administratorRepository: IAdministratorRepository,
        private hashProvider: IHashProvider,
        private tokenProvider: ITokenProvider,
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const administrator = await this.administratorRepository.findByEmail(
            email,
        );

        if (!administrator) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(
            password,
            administrator.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = this.tokenProvider.generateToken({
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
