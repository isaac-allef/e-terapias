import Moderator from '../entities/Moderator';
import LoadModeratorByIdRepository from '../protocols/db/repositories/LoadModeratorByIdRepository';

class LoadModeratorByIdService {
    constructor(
        private loadModeratorByIdRepository: LoadModeratorByIdRepository,
    ) {}

    public async execute(id: string): Promise<Moderator> {
        const moderator = await this.loadModeratorByIdRepository.load(id);

        return moderator;
    }
}

export default LoadModeratorByIdService;
