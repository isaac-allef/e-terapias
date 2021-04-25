import AppError from '../../errors/AppError';
import FindByIdEterapiaFilterByModeratorDTO from './dtos/FindByIdEterapiaFilterByModeratorDTO';
import Eterapia from '../../entities/Eterapia';
import EterapiaRepository from '../../protocols/db/repositories/EterapiaRepository';

class ShowEterapiaFilterByModeratorService {
    constructor(private eterapiaRepository: EterapiaRepository) {}

    public async execute({
        id,
        relations,
        moderatorId,
    }: FindByIdEterapiaFilterByModeratorDTO): Promise<Eterapia | undefined> {
        const eterapia = await this.eterapiaRepository.findByIdFilterByModerator(
            {
                id,
                relations,
                moderatorId,
            },
        );

        if (!eterapia) {
            throw new AppError('Eterapia not found in your relations.');
        }

        return eterapia;
    }
}

export default ShowEterapiaFilterByModeratorService;
