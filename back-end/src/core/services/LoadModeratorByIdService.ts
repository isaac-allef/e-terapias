import Moderator from '../entities/Moderator';
import LoadModeratorByIdRepository from '../protocols/db/repositories/LoadModeratorByIdRepository';

class LoadModeratorByIdService {
    constructor(
        private loadModeratorByIdRepository: LoadModeratorByIdRepository,
    ) {}

    public async execute(id: string): Promise<Moderator> {
        return this.loadModeratorByIdRepository.load(id);
    }
}

export default LoadModeratorByIdService;
