import AppError from '../../errors/AppError';
import Moderator from '../../entities/Moderator';
import ModeratorRepository from '../../protocols/db/repositories/ModeratorRepository';

interface Request {
    id: string;
}

class DeleteModeratorService {
    constructor(private moderatorRepository: ModeratorRepository) {}

    public async execute({ id }: Request): Promise<Moderator> {
        const moderator = await this.moderatorRepository.findById({ id });

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        await this.moderatorRepository.delete(moderator);

        return moderator;
    }
}

export default DeleteModeratorService;
