import AppError from '../../errors/AppError';
import RelationModeratorEterapiaDTO from './dtos/RelationModeratorEterapiaDTO';
import Moderator from '../../entities/Moderator';
import ModeratorRepository from '../../protocols/db/repositories/ModeratorRepository';

class DeleteRelationBetweenModeratorAndEterapiaService {
    constructor(private moderatorRepository: ModeratorRepository) {}

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

        let eterapiaRelateToThisModerator = false;
        const newEterapiasArray = moderator.eterapias.filter(
            (eterapia: { id: string }) => {
                if (eterapia.id === eterapiaId) {
                    eterapiaRelateToThisModerator = true;
                }
                return eterapia.id !== eterapiaId;
            },
        );

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
