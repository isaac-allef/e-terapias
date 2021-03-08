import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../shared/errors/AppError';
import IModerator from '../models/IModerator';
import IModeratorRepository from '../repositories/IModeratorRepository';

interface Request {
    email: string;
    password: string;
}

interface Response {
    moderator: IModerator;
    token: string;
}

class AuthenticateModeratorService {
    constructor(private moderatorRepository: IModeratorRepository) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const moderator = await this.moderatorRepository.findByEmail(email);

        if (!moderator) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await compare(password, moderator.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwtModerator;

        const token = sign({}, secret, {
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
