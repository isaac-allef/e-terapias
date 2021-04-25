import AppError from '../../errors/AppError';
import HashGenerater from '../../protocols/cryptography/HashGenerater';
import CreateModeratorDTO from './dtos/CreateModeratorDTO';
import Moderator from '../../entities/Moderator';
import ModeratorRepository from '../../protocols/db/repositories/ModeratorRepository';

interface Request extends CreateModeratorDTO {
    id: string;
}

class UpdateModeratorService {
    constructor(
        private moderatorRepository: ModeratorRepository,
        private hashGenerater: HashGenerater,
    ) {}

    public async execute({ id, email, password }: Request): Promise<Moderator> {
        const moderator = await this.moderatorRepository.findById({ id });

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        if (email) {
            moderator.email = email;
        }

        if (password) {
            const hashedPassword = await this.hashGenerater.generate(password);
            moderator.password = hashedPassword;
        }

        await this.moderatorRepository.save(moderator);

        return moderator;
    }
}

export default UpdateModeratorService;
