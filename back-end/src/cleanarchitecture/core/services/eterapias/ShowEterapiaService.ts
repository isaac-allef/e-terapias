import AppError from '../../errors/AppError';
import FindByIdEterapiaDTO from './dtos/FindByIdEterapiaDTO';
import Eterapia from '../../entities/Eterapia';
import EterapiaRepository from '../../protocols/db/repositories/EterapiaRepository';

class ShowEterapiaService {
    constructor(private eterapiaRepository: EterapiaRepository) {}

    public async execute({
        id,
        relations,
    }: FindByIdEterapiaDTO): Promise<Eterapia | undefined> {
        const eterapia = await this.eterapiaRepository.findById({
            id,
            relations,
        });

        if (!eterapia) {
            throw new AppError('Eterapia not found.');
        }

        return eterapia;
    }
}

export default ShowEterapiaService;
