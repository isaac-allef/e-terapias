import CreateTemplateService from '../../core/services/CreateTemplateService';
import CreateTemplateFakeRepository from '../../infra/db/typeorm/repositories/fakes/CreateTemplateFakeRepository';

const makeCreateTemplateService = (): CreateTemplateService => {
    const createTemplateRepository = new CreateTemplateFakeRepository();

    const createTemplate = new CreateTemplateService(createTemplateRepository);

    return createTemplate;
};

export default makeCreateTemplateService;
