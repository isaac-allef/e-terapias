import DeleteTemplateByIdService from '../../../../core/services/DeleteTemplateByIdService';
import TemplateTypeormRepository from '../../../../infra/db/typeorm/repositories/TemplateTypeormRepository';
import { DeleteTemplateController } from '../../../../presentation/controllers/DeleteTemplateController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeDeleteTemplateContoller = (): Controller => {
    const updateTemplateRepository = new TemplateTypeormRepository();
    const deleteTemplateByIdService = new DeleteTemplateByIdService(
        updateTemplateRepository,
    );
    return new DeleteTemplateController(deleteTemplateByIdService);
};

export default makeDeleteTemplateContoller;
