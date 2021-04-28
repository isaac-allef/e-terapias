import Moderator from '../entities/Moderator';
import HashGenerater from '../protocols/cryptography/HashGenerater';
import CreateModeratorRepository from '../protocols/db/repositories/CreateModeratorRepository';

export type params = {
    email: string;
    name: string;
};

class CreateModeratorService {
    constructor(
        private hashGenerater: HashGenerater,
        private createModeratorRepository: CreateModeratorRepository,
    ) {}

    public async execute({ email, name }: params): Promise<Moderator> {
        const randomPassword = '1234';
        const passwordHashed = await this.hashGenerater.generate(
            randomPassword,
        );
        const moderator = await this.createModeratorRepository.create({
            email,
            name,
            password: passwordHashed,
        });

        return moderator;
    }
}

export default CreateModeratorService;
