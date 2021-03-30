import AppError from '../../../shared/errors/AppError';
import IModerator from '../models/IModerator';
import IModeratorRepository from '../repositories/IModeratorRepository';

interface Request {
    id: string;
}

class DeleteModeratorService {
    constructor(private moderatorRepository: IModeratorRepository) {}

    public async execute({ id }: Request): Promise<IModerator> {
        const moderator = await this.moderatorRepository.findById(id);

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        await this.moderatorRepository.delete(moderator);

        return moderator;
    }
}

export default DeleteModeratorService;
