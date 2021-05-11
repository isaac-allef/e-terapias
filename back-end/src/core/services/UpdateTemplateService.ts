import Template, { templateField } from '../entities/Template';
import UpdateTemplateRepository from '../protocols/db/repositories/UpdateTemplateRepository';
import LinkTemplateToEtherapiesRepository from '../protocols/db/repositories/LinkTemplateToEtherapiesRepository';
import { validateTemplateFields } from './utils/ValidateTemplateFields';

export type params = {
    id: string;
    description: {
        name: string;
        templateFields: templateField[];
        etherapiesIds: string[];
    };
};

class UpdateTemplateService {
    constructor(
        private updateTemplateRepository: UpdateTemplateRepository,
        private linkTemplateToEtherapiesRepository: LinkTemplateToEtherapiesRepository,
    ) {}

    public async execute({ id, description }: params): Promise<Template> {
        validateTemplateFields(description.templateFields);

        const template = await this.updateTemplateRepository.update({
            id,
            description,
        });

        const { etherapiesIds } = description;

        await this.linkTemplateToEtherapiesRepository.linkTemplate(
            template,
            etherapiesIds,
            true,
        );

        return template;
    }
}

export default UpdateTemplateService;
