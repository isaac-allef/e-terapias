import Template from '../../../entities/Template';

export default interface LinkTemplateToEtherapiesRepository {
    linkTemplate(template: Template, etherapiesIds: string[]): Promise<boolean>;
}
