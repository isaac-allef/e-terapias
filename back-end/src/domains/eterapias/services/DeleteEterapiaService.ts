import AppError from '../../../shared/errors/AppError';
import IEterapia from '../models/IEterapia';
import IEterapiaRepository from '../repositories/IEterapiaRepository';

interface Request {
    id: string;
}

class DeleteEterapiaService {
    constructor(private eterapiaRepository: IEterapiaRepository) {}

    public async execute({ id }: Request): Promise<IEterapia> {
        const eterapia = await this.eterapiaRepository.findById({ id });

        if (!eterapia) {
            throw new AppError('Eterapia not found.');
        }

        await this.eterapiaRepository.delete(eterapia);

        return eterapia;
    }
}

export default DeleteEterapiaService;
