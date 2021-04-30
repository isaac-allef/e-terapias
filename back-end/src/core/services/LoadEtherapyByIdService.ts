import Etherapy from '../entities/Etherapy';
import LoadEtherapyByIdRepository from '../protocols/db/repositories/LoadEtherapyByIdRepository';

class LoadEtherapyByIdService {
    constructor(
        private loadEtherapyByIdRepository: LoadEtherapyByIdRepository,
    ) {}

    public async execute(id: string): Promise<Etherapy> {
        return this.loadEtherapyByIdRepository.load(id);
    }
}

export default LoadEtherapyByIdService;
