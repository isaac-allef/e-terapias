import Template, { templateField } from '../entities/Template';
import CreateTemplateRepository from '../protocols/db/repositories/CreateTemplateRepository';

export type params = {
    name: string;
    templateFields: templateField[];
};

class CreateTemplateService {
    constructor(private createTemplateRepository: CreateTemplateRepository) {}

    public async execute({ name, templateFields }: params): Promise<Template> {
        const template = await this.createTemplateRepository.create(
            name,
            templateFields,
        );

        return template;
    }
}

export default CreateTemplateService;
