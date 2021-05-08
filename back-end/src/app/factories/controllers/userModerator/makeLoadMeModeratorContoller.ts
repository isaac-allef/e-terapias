import LoadModeratorByIdService from '../../../../core/services/LoadModeratorByIdService';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { LoadMeModeratorController } from '../../../../presentation/controllers/LoadMeModeratorController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadMeModeratorContoller = (): Controller => {
    const loadModeratorRepository = new ModeratorTypeormRepository();
    const loadModeratorByIdService = new LoadModeratorByIdService(
        loadModeratorRepository,
    );
    return new LoadMeModeratorController(loadModeratorByIdService);
};

export default makeLoadMeModeratorContoller;
