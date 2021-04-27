import Template, { templateField } from '../entities/Template';
import CreateTemplateRepository from '../protocols/db/repositories/CreateTemplateRepository';

class CreateTemplateService {
    constructor(private createTemplateRepository: CreateTemplateRepository) {}

    public async execute(
        name: string,
        templateFields: templateField[],
    ): Promise<Template> {
        const template = await this.createTemplateRepository.create(
            name,
            templateFields,
        );

        return template;
    }
}

export default CreateTemplateService;
