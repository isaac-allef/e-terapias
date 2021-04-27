import Etherapy from '../../../../../core/entities/Etherapy';
import Template from '../../../../../core/entities/Template';
import LinkTemplateToEtherapiesRepository from '../../../../../core/protocols/db/repositories/LinkTemplateToEtherapiesRepository';

class LinkTemplateToEtherapiesFakeRepository
    implements LinkTemplateToEtherapiesRepository {
    async link(template: Template, etherapies: Etherapy[]): Promise<boolean> {
        etherapies.forEach(e => {
            e.template = template;
        });

        return true;
    }
}

export default LinkTemplateToEtherapiesFakeRepository;
