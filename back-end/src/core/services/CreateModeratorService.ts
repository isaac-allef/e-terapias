import Moderator from '../entities/Moderator';
import CreateModeratorRepository from '../protocols/db/repositories/CreateModeratorRepository';

export type params = {
    email: string;
    name: string;
};

class CreateModeratorService {
    constructor(private createModeratorRepository: CreateModeratorRepository) {}

    public async execute({ email, name }: params): Promise<Moderator> {
        const moderator = await this.createModeratorRepository.create(
            email,
            name,
        );

        return moderator;
    }
}

export default CreateModeratorService;
