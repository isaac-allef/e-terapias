import Moderator from '../../../../../core/entities/Moderator';
import LoadModeratorByIdRepository from '../../../../../core/protocols/db/repositories/LoadModeratorByIdRepository';
import EtherapyFake from '../../entities/Fakes/EtherapyFake';
import ModeratorFake from '../../entities/Fakes/ModeratorFake';
import TemplateFake from '../../entities/Fakes/TemplateFake';

class LoadModeratorByIdFakeRepository implements LoadModeratorByIdRepository {
    async load(id: string): Promise<Moderator> {
        const moderator = new ModeratorFake('load moderator');

        moderator.id = id;

        const etherapy = new EtherapyFake('load etherapy');

        etherapy.id = 'eieieiei';

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

        moderator.etherapies.push(etherapy);

        return moderator;
    }
}

export default LoadModeratorByIdFakeRepository;
