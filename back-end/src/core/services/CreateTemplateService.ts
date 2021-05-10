import Template, { templateField } from '../entities/Template';
import CreateTemplateRepository from '../protocols/db/repositories/CreateTemplateRepository';
import LinkTemplateToEtherapiesRepository from '../protocols/db/repositories/LinkTemplateToEtherapiesRepository';

export type params = {
    name: string;
    templateFields: templateField[];
    etherapiesIds: string[];
};

class CreateTemplateService {
    constructor(
        private createTemplateRepository: CreateTemplateRepository,
        private linkTemplateToEtherapiesRepository: LinkTemplateToEtherapiesRepository,
    ) {}

    public async execute({
        name,
        templateFields,
        etherapiesIds,
    }: params): Promise<Template> {
        const template = await this.createTemplateRepository.create({
            name,
            templateFields,
        });

        await this.linkTemplateToEtherapiesRepository.linkTemplate(
            template,
            etherapiesIds,
        );

        return template;
    }
}

export default CreateTemplateService;
