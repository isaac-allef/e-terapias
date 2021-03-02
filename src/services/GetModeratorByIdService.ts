import { Repository } from 'typeorm';
import Moderator from '../entities/Moderator';
import AppError from '../errors/AppError';

interface Request {
    moderatorId: string;
    moderatorRepository: Repository<Moderator>;
}

class GetModeratorByIdService {
    public async execute({
        moderatorId,
        moderatorRepository,
    }: Request): Promise<Moderator> {
        const moderator = await moderatorRepository.findOne({
            where: { id: moderatorId },
        });

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        return moderator;
    }
}

export default GetModeratorByIdService;
