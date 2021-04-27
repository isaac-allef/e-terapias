import Etherapy from '../../../../../core/entities/Etherapy';
import LoadEtherapyByIdRepository from '../../../../../core/protocols/db/repositories/LoadEtherapyByIdRepository';
import EtherapyFake from '../../entities/Fakes/EtherapyFake';

class LoadEtherapyByIdFakeRepository implements LoadEtherapyByIdRepository {
    async load(id: string): Promise<Etherapy> {
        const etherapy = new EtherapyFake('load Etherapy');

        etherapy.id = id;

        return etherapy;
    }
}

export default LoadEtherapyByIdFakeRepository;
