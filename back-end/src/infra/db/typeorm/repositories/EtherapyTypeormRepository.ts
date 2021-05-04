/* eslint-disable no-restricted-syntax */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Etherapy from '../../../../core/entities/Etherapy';
import CreateEtherapiesRepository, {
    params,
} from '../../../../core/protocols/db/repositories/CreateEtherapiesRepository';
import LoadEtherapyByIdRepository from '../../../../core/protocols/db/repositories/LoadEtherapyByIdRepository';
import EtherapyTypeorm from '../entities/EtherapyTypeorm';

@EntityRepository()
class EtherapyTypeormRepository
    implements CreateEtherapiesRepository, LoadEtherapyByIdRepository {
    private ormRepository: Repository<EtherapyTypeorm>;

    constructor() {
        this.ormRepository = getRepository(EtherapyTypeorm);
    }

    public async create(data: params): Promise<Etherapy[]> {
        try {
            const etherapies = [];

            for (const dto of data) {
                const etherapy = this.ormRepository.create({ name: dto.name });
                etherapies.push(etherapy);
            }

            await this.ormRepository.save(etherapies);

            return etherapies;
        } catch {
            throw new Error('Create etherapies error');
        }
    }

    async load(id: string): Promise<Etherapy> {
        try {
            const etherapy = await this.ormRepository.findOne({
                where: { id },
            });

            if (!etherapy) {
                throw new Error('Etherapy not found');
            }

            return etherapy;
        } catch {
            throw new Error('Load etherapy error');
        }
    }
}

export default EtherapyTypeormRepository;
