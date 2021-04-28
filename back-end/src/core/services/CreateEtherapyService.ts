import Etherapy from '../entities/Etherapy';
import CreateEtherapyRepository from '../protocols/db/repositories/CreateEtherapyRepository';

export type params = {
    name: string;
};

class CreateEtherapyService {
    constructor(private createEtherapyRepository: CreateEtherapyRepository) {}

    public async execute({ name }: params): Promise<Etherapy> {
        const etherapy = await this.createEtherapyRepository.create({ name });

        return etherapy;
    }
}

export default CreateEtherapyService;
