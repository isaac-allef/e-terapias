import DeleteModeratorByIdService from '../../../../core/services/DeleteModeratorByIdService';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { DeleteModeratorController } from '../../../../presentation/controllers/DeleteModeratorController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeDeleteModeratorContoller = (): Controller => {
    const updateTemplateRepository = new ModeratorTypeormRepository();
    const deleteModeratorByIdService = new DeleteModeratorByIdService(
        updateTemplateRepository,
    );
    return new DeleteModeratorController(deleteModeratorByIdService);
};

export default makeDeleteModeratorContoller;
