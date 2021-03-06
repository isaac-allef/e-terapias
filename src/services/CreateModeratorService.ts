import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import Moderator from '../typeorm/entities/Moderator';
import ModeratorRepository from '../typeorm/repositories/ModeratorRepository';

interface Request {
    email: string;
    password: string;
}

class CreateModeratorService {
    constructor(private moderatorRepository: ModeratorRepository) {}

    public async execute({ email, password }: Request): Promise<Moderator> {
        const checkModeratorExists = await this.moderatorRepository.findByEmail(
            email,
        );

        if (checkModeratorExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 9);

        const moderator = await this.moderatorRepository.create({
            email,
            password: hashedPassword,
        });

        return moderator;
    }
}

export default CreateModeratorService;
