import Etherapy from '../entities/Etherapy';
import CreateEtherapyRepository from '../protocols/db/repositories/CreateEtherapyRepository';

class CreateEtherapyService {
    constructor(private createEtherapyRepository: CreateEtherapyRepository) {}

    public async execute(name: string): Promise<Etherapy> {
        const etherapy = await this.createEtherapyRepository.create(name);

        return etherapy;
    }
}

export default CreateEtherapyService;
