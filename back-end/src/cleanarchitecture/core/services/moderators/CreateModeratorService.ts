import AppError from '../../errors/AppError';
import HashGenerater from '../../protocols/cryptography/HashGenerater';
import CreateModeratorDTO from './dtos/CreateModeratorDTO';
import Moderator from '../../entities/Moderator';
import ModeratorRepository from '../../protocols/db/repositories/ModeratorRepository';

class CreateModeratorService {
    constructor(
        private moderatorRepository: ModeratorRepository,
        private hashGenerater: HashGenerater,
    ) {}

    public async execute({
        email,
        password,
    }: CreateModeratorDTO): Promise<Moderator> {
        const checkModeratorExists = await this.moderatorRepository.findByEmail(
            { email },
        );

        if (checkModeratorExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await this.hashGenerater.generate(password);

        const moderator = await this.moderatorRepository.create({
            email,
            password: hashedPassword,
        });

        return moderator;
    }
}

export default CreateModeratorService;
