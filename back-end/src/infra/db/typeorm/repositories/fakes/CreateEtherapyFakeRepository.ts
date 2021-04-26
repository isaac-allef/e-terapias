import Etherapy from '../../../../../core/entities/Etherapy';
import CreateEtherapyRepository from '../../../../../core/protocols/db/repositories/CreateEtherapyRepository';
import EtherapyFake from '../../entities/Fakes/EtherapyFake';

class CreateEtherapyFakeRepository implements CreateEtherapyRepository {
    async create(name: string): Promise<Etherapy> {
        const etherapy = new EtherapyFake(name);

        return etherapy;
    }
}

export default CreateEtherapyFakeRepository;
