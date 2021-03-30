import AppError from '../../../shared/errors/AppError';
import IRelationModeratorEterapiaDTO from '../dtos/IRelationModeratorEterapiaDTO';
import IModerator from '../models/IModerator';
import IModeratorRepository from '../repositories/IModeratorRepository';

class DeleteRelationBetweenModeratorAndEterapiaService {
    constructor(private moderatorRepository: IModeratorRepository) {}

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

        let eterapiaRelateToThisModerator = false;
        const newEterapiasArray = moderator.eterapias.filter(eterapia => {
            if (eterapia.id === eterapiaId) {
                eterapiaRelateToThisModerator = true;
            }
            return eterapia.id !== eterapiaId;
        });

        if (!eterapiaRelateToThisModerator) {
            throw new AppError(
                'This eterapia does not relate to this moderator.',
            );
        }

        moderator.eterapias = newEterapiasArray;

        await this.moderatorRepository.save(moderator);

        return moderator;
    }
}

export default DeleteRelationBetweenModeratorAndEterapiaService;
