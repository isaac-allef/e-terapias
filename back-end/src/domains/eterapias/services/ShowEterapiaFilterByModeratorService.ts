import AppError from '../../../shared/errors/AppError';
import IFindByIdEterapiaFilterByModeratorDTO from '../dtos/IFindByIdEterapiaFilterByModeratorDTO';
import IEterapia from '../models/IEterapia';
import IEterapiaRepository from '../repositories/IEterapiaRepository';

class ShowEterapiaFilterByModeratorService {
    constructor(private eterapiaRepository: IEterapiaRepository) {}

    public async execute({
        id,
        relations,
        moderatorId,
    }: IFindByIdEterapiaFilterByModeratorDTO): Promise<IEterapia | undefined> {
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
