import Etherapy from '../entities/Etherapy';
import AppError from '../errors/AppError';
import LoadEtherapyByIdRepository from '../protocols/db/repositories/LoadEtherapyByIdRepository';

class LoadEtherapyByIdService {
    constructor(
        private loadEtherapyByIdRepository: LoadEtherapyByIdRepository,
    ) {}

    public async execute(id: string): Promise<Etherapy> {
        const etherapy = await this.loadEtherapyByIdRepository.load(id);

        if (!etherapy) {
            throw new AppError('Moderator not found.');
        }

        return etherapy;
    }
}

export default LoadEtherapyByIdService;
