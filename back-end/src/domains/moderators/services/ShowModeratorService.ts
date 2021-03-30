import AppError from '../../../shared/errors/AppError';
import IFindByIdModeratorDTO from '../dtos/IFindByIdModeratorDTO';
import IModerator from '../models/IModerator';
import IModeratorRepository from '../repositories/IModeratorRepository';

class ShowModeratorService {
    constructor(private moderatorRepository: IModeratorRepository) {}

    public async execute({
        id,
        relations,
    }: IFindByIdModeratorDTO): Promise<IModerator> {
        const moderator = await this.moderatorRepository.findById({
            id,
            relations,
        });

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        return moderator;
    }
}

export default ShowModeratorService;
