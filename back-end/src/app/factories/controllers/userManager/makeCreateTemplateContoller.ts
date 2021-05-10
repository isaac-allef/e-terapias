import CreateTemplateService from '../../../../core/services/CreateTemplateService';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import TemplateTypeormRepository from '../../../../infra/db/typeorm/repositories/TemplateTypeormRepository';
import { CreateTemplateController } from '../../../../presentation/controllers/CreateTemplateController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeCreateTemplateContoller = (): Controller => {
    const createTemplateRepository = new TemplateTypeormRepository();
    const linkTemplateToEtherapiesRepository = new EtherapyTypeormRepository();
    const createTemplateService = new CreateTemplateService(
        createTemplateRepository,
        linkTemplateToEtherapiesRepository,
    );
    return new CreateTemplateController(createTemplateService);
};

export default makeCreateTemplateContoller;
