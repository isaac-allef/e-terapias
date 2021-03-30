import { hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';
import ICreateModeratorDTO from '../dtos/ICreateModeratorDTO';
import IModerator from '../models/IModerator';
import IModeratorRepository from '../repositories/IModeratorRepository';

interface Request extends ICreateModeratorDTO {
    id: string;
}

class UpdateModeratorService {
    constructor(private moderatorRepository: IModeratorRepository) {}

    public async execute({
        id,
        email,
        password,
    }: Request): Promise<IModerator> {
        const moderator = await this.moderatorRepository.findById(id);

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        if (email) {
            moderator.email = email;
        }

        if (password) {
            const hashedPassword = await hash(password, 9);
            moderator.password = hashedPassword;
        }

        await this.moderatorRepository.save(moderator);

        return moderator;
    }
}

export default UpdateModeratorService;
