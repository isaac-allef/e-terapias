import LoadTemplateByIdService from '../../../core/services/LoadTemplateByIdService';
import TemplateTypeormRepository from '../../../infra/db/typeorm/repositories/TemplateTypeormRepository';
import { LoadTemplateController } from '../../../presentation/controllers/LoadTemplateController';
import { Controller } from '../../../presentation/protocols/controller';

const makeLoadTemplateContoller = (): Controller => {
    const loadTemplateRepository = new TemplateTypeormRepository();
    const loadTemplateByIdService = new LoadTemplateByIdService(
        loadTemplateRepository,
    );
    return new LoadTemplateController(loadTemplateByIdService);
};

export default makeLoadTemplateContoller;
