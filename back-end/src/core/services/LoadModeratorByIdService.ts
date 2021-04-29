import Moderator from '../entities/Moderator';
import AppError from '../errors/AppError';
import LoadModeratorByIdRepository from '../protocols/db/repositories/LoadModeratorByIdRepository';

class LoadModeratorByIdService {
    constructor(
        private loadModeratorByIdRepository: LoadModeratorByIdRepository,
    ) {}

    public async execute(id: string): Promise<Moderator> {
        const moderator = await this.loadModeratorByIdRepository.load(id);

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        return moderator;
    }
}

export default LoadModeratorByIdService;
