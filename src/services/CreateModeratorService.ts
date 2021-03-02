import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import Moderator from '../entities/Moderator';

interface Request {
    email: string;
    password: string;
}

class CreateModeratorService {
    public async execute({ email, password }: Request): Promise<Moderator> {
        const moderatorRepository = getRepository(Moderator);

        const checkModeratorExists = await moderatorRepository.findOne({
            where: { email },
        });

        if (checkModeratorExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 9);

        const moderator = moderatorRepository.create({
            email,
            password: hashedPassword,
        });

        await moderatorRepository.save(moderator);

        return moderator;
    }
}

export default CreateModeratorService;
