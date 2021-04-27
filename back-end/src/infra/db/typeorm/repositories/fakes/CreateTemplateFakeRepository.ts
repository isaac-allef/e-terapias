import Template, { templateField } from '../../../../../core/entities/Template';
import CreateTemplateRepository from '../../../../../core/protocols/db/repositories/CreateTemplateRepository';
import TemplateFake from '../../entities/Fakes/TemplateFake';

class CreateTemplateFakeRepository implements CreateTemplateRepository {
    async create(
        name: string,
        templateFields: templateField[],
    ): Promise<Template> {
        const template = new TemplateFake(name, templateFields);

        return template;
    }
}

export default CreateTemplateFakeRepository;
