import LoadModeratorByIdService from '../../../../core/services/LoadModeratorByIdService';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { LoadModeratorController } from '../../../../presentation/controllers/LoadModeratorController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadModeratorContoller = (): Controller => {
    const loadModeratorRepository = new ModeratorTypeormRepository();
    const loadModeratorByIdService = new LoadModeratorByIdService(
        loadModeratorRepository,
    );
    return new LoadModeratorController(loadModeratorByIdService);
};

export default makeLoadModeratorContoller;
