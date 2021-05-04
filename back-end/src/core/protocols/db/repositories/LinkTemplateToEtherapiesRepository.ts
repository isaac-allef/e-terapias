import Template from '../../../entities/Template';
import Etherapy from '../../../entities/Etherapy';

export default interface LinkTemplateToEtherapiesRepository {
    linkTemplate(template: Template, etherapies: Etherapy[]): Promise<boolean>;
}
