import { Repository } from 'typeorm';
import Eterapia from '../entities/Eterapia';
import AppError from '../errors/AppError';

interface Request {
    eterapiaId: string;
    eterapiaRepository: Repository<Eterapia>;
}

class GetEterapiaByIdService {
    public async execute({
        eterapiaId,
        eterapiaRepository,
    }: Request): Promise<Eterapia> {
        const eterapia = await eterapiaRepository.findOne({
            where: { id: eterapiaId },
        });

        if (!eterapia) {
            throw new AppError('Eterapia not found.');
        }

        return eterapia;
    }
}

export default GetEterapiaByIdService;
