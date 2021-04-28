import Moderator from '../entities/Moderator';
import CreateModeratorRepository from '../protocols/db/repositories/CreateModeratorRepository';

class CreateModeratorService {
    constructor(private createModeratorRepository: CreateModeratorRepository) {}

    public async execute(email: string, name: string): Promise<Moderator> {
        const moderator = await this.createModeratorRepository.create(
            email,
            name,
        );

        return moderator;
    }
}

export default CreateModeratorService;
