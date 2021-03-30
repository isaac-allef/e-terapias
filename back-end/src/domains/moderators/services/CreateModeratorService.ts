import { hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';
import ICreateModeratorDTO from '../dtos/ICreateModeratorDTO';
import IModerator from '../models/IModerator';
import IModeratorRepository from '../repositories/IModeratorRepository';

class CreateModeratorService {
    constructor(private moderatorRepository: IModeratorRepository) {}

    public async execute({
        email,
        password,
    }: ICreateModeratorDTO): Promise<IModerator> {
        const checkModeratorExists = await this.moderatorRepository.findByEmail(
            { email },
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
