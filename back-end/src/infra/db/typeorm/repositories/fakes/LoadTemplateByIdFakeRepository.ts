import Template from '../../../../../core/entities/Template';
import LoadTemplateByIdRepository from '../../../../../core/protocols/db/repositories/LoadTemplateByIdRepository';
import TemplateFake from '../../entities/Fakes/TemplateFake';

class LoadTemplateByIdFakeRepository implements LoadTemplateByIdRepository {
    async load(id: string): Promise<Template> {
        const templateFields = [
            { name: 'Qual o seu nome?' },
            { name: 'Quanto é 2 + 2?' },
            {
                name: 'Informe sua data de nascimento',
            },
            { name: 'Voçê é estudante?' },
        ];

        const template = new TemplateFake('load template', templateFields);

        template.id = id;

        return template;
    }
}

export default LoadTemplateByIdFakeRepository;
