import AppError from '../../errors/AppError';
import EterapiaRepository from '../../protocols/db/repositories/EterapiaRepository';
import RelationModeratorEterapiaDTO from './dtos/RelationModeratorEterapiaDTO';
import Moderator from '../../entities/Moderator';
import ModeratorRepository from '../../protocols/db/repositories/ModeratorRepository';

class CreateRelationBetweenModeratorAndEterapiaService {
    constructor(
        private moderatorRepository: ModeratorRepository,
        private eterapiaRepository: EterapiaRepository,
    ) {}

    public async execute({
        eterapiaId,
        moderatorId,
    }: RelationModeratorEterapiaDTO): Promise<Moderator> {
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
