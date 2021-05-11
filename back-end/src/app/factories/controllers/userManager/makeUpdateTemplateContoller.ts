import UpdateTemplateService from '../../../../core/services/UpdateTemplateService';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import TemplateTypeormRepository from '../../../../infra/db/typeorm/repositories/TemplateTypeormRepository';
import { UpdateTemplateController } from '../../../../presentation/controllers/UpdateTemplateController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeUpdateTemplateContoller = (): Controller => {
    const updateTemplateRepository = new TemplateTypeormRepository();
    const linkTemplateToEtherapiesRepository = new EtherapyTypeormRepository();
    const updateTemplateService = new UpdateTemplateService(
        updateTemplateRepository,
        linkTemplateToEtherapiesRepository,
    );
    return new UpdateTemplateController(updateTemplateService);
};

export default makeUpdateTemplateContoller;
