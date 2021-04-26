import Moderator from '../entities/Moderator';
import CreateModeratorRepository from '../protocols/db/repositories/CreateModeratorRepository';

class CreateModeratorService {
    constructor(private createModeratorRepository: CreateModeratorRepository) {}

    public async execute(name: string): Promise<Moderator> {
        const moderator = await this.createModeratorRepository.create(name);

        return moderator;
    }
}

export default CreateModeratorService;
