import AppError from '../../errors/AppError';
import FindByIdModeratorDTO from './dtos/FindByIdModeratorDTO';
import Moderator from '../../entities/Moderator';
import ModeratorRepository from '../../protocols/db/repositories/ModeratorRepository';

class ShowModeratorService {
    constructor(private moderatorRepository: ModeratorRepository) {}

    public async execute({
        id,
        relations,
    }: FindByIdModeratorDTO): Promise<Moderator> {
        const moderator = await this.moderatorRepository.findById({
            id,
            relations,
        });

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        return moderator;
    }
}

export default ShowModeratorService;
