import Etherapy from '../entities/Etherapy';
import AppError from '../errors/AppError';
import CreateEtherapiesRepository from '../protocols/db/repositories/CreateEtherapiesRepository';

type dto = {
    name: string;
};

export type params = dto[];

class CreateEtherapiesService {
    constructor(
        private createEtherapiesRepository: CreateEtherapiesRepository,
    ) {}

    public async execute(data: params): Promise<Etherapy[]> {
        const etherapies = await this.createEtherapiesRepository.create(data);

        if (!etherapies) {
            throw new AppError('Create etherapies fail.');
        }

        return etherapies;
    }
}

export default CreateEtherapiesService;
