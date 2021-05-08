import CreateTemplateService from '../../../core/services/CreateTemplateService';
import TemplateTypeormRepository from '../../../infra/db/typeorm/repositories/TemplateTypeormRepository';
import { CreateTemplateController } from '../../../presentation/controllers/CreateTemplateController';
import { Controller } from '../../../presentation/protocols/controller';

const makeCreateTemplateContoller = (): Controller => {
    const createTemplateRepository = new TemplateTypeormRepository();
    const createTemplateService = new CreateTemplateService(
        createTemplateRepository,
    );
    return new CreateTemplateController(createTemplateService);
};

export default makeCreateTemplateContoller;
