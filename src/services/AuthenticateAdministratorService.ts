import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';
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
    constructor(private administratorRepository: IAdministratorRepository) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const administrator = await this.administratorRepository.findByEmail(
            email,
        );

        if (!administrator) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await compare(password, administrator.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
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
