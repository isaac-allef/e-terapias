import AppError from '../../errors/AppError';
import Eterapia from '../../entities/Eterapia';
import EterapiaRepository from '../../protocols/db/repositories/EterapiaRepository';

interface Request {
    id: string;
}

class DeleteEterapiaService {
    constructor(private eterapiaRepository: EterapiaRepository) {}

    public async execute({ id }: Request): Promise<Eterapia> {
        const eterapia = await this.eterapiaRepository.findById({ id });

        if (!eterapia) {
            throw new AppError('Eterapia not found.');
        }

        await this.eterapiaRepository.delete(eterapia);

        return eterapia;
    }
}

export default DeleteEterapiaService;
