import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';
import Moderator from '../entities/Moderator';

interface Request {
    email: string;
    password: string;
}

interface Response {
    moderator: Moderator;
    token: string;
}

class AuthenticateModeratorService {
    public async execute({ email, password }: Request): Promise<Response> {
        const moderatorRepository = getRepository(Moderator);

        const moderator = await moderatorRepository.findOne({
            where: { email },
        });

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
