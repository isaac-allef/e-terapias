import AppError from '../../../shared/errors/AppError';
import IFindByIdEterapiaDTO from '../dtos/IFindByIdEterapiaDTO';
import IEterapia from '../models/IEterapia';
import IEterapiaRepository from '../repositories/IEterapiaRepository';

class ShowEterapiaService {
    constructor(private eterapiaRepository: IEterapiaRepository) {}

    public async execute({
        id,
        relations,
    }: IFindByIdEterapiaDTO): Promise<IEterapia | undefined> {
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
