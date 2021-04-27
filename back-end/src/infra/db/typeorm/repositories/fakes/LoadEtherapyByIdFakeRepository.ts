import Etherapy from '../../../../../core/entities/Etherapy';
import LoadEtherapyByIdRepository from '../../../../../core/protocols/db/repositories/LoadEtherapyByIdRepository';
import EtherapyFake from '../../entities/Fakes/EtherapyFake';
import TemplateFake from '../../entities/Fakes/TemplateFake';

class LoadEtherapyByIdFakeRepository implements LoadEtherapyByIdRepository {
    async load(id: string): Promise<Etherapy> {
        const etherapy = new EtherapyFake('load Etherapy');

        etherapy.id = id;

        const templateFields = [
            { name: 'Qual o seu nome?' },
            { name: 'Quanto é 2 + 2?' },
            {
                name: 'Informe sua data de nascimento',
            },
            { name: 'Voçê é estudante?' },
        ];

        const template = new TemplateFake('load template', templateFields);

        etherapy.template = template;

        return etherapy;
    }
}

export default LoadEtherapyByIdFakeRepository;
