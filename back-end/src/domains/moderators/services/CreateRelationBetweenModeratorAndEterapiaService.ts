import AppError from '../../../shared/errors/AppError';
import IEterapiaRepository from '../../eterapias/repositories/IEterapiaRepository';
import IRelationModeratorEterapiaDTO from '../dtos/IRelationModeratorEterapiaDTO';
import IModerator from '../models/IModerator';
import IModeratorRepository from '../repositories/IModeratorRepository';

class CreateRelationBetweenModeratorAndEterapiaService {
    constructor(
        private moderatorRepository: IModeratorRepository,
        private eterapiaRepository: IEterapiaRepository,
    ) {}

    public async execute({
        eterapiaId,
        moderatorId,
    }: IRelationModeratorEterapiaDTO): Promise<IModerator> {
        const moderator = await this.moderatorRepository.findById({
            id: moderatorId,
            relations: ['eterapias'],
        });

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        const eterapia = await this.eterapiaRepository.findById({
            id: eterapiaId,
        });

        if (!eterapia) {
            throw new AppError('Eterapia not found.');
        }

        moderator.eterapias.push(eterapia);

        await this.moderatorRepository.save(moderator);

        return moderator;
    }
}

export default CreateRelationBetweenModeratorAndEterapiaService;
