import Etherapy from '../entities/Etherapy';
import CreateEtherapyRepository from '../protocols/db/repositories/CreateEtherapyRepository';

type dto = {
    name: string;
};

export type params = dto[];

class CreateEtherapiesService {
    constructor(private createEtherapyRepository: CreateEtherapyRepository) {}

    public async execute(data: params): Promise<Etherapy[]> {
        const etherapies = await Promise.all(
            data.map(async d => {
                const etherapy = await this.createEtherapyRepository.create({
                    name: d.name,
                });

                return etherapy;
            }),
        );

        return etherapies;
    }
}

export default CreateEtherapiesService;
