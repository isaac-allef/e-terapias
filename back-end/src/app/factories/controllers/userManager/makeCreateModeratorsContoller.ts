import CreateModeratorsService from '../../../../core/services/CreateModeratorsService';
import BcryptAdapter from '../../../../infra/cryptography/bcryptAdapter';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { CreateModeratorsController } from '../../../../presentation/controllers/CreateModeratorsController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeCreateModeratorsContoller = (): Controller => {
    const createModeratorsRepository = new ModeratorTypeormRepository();
    const hashGenerater = new BcryptAdapter(12);
    const createModeratorsService = new CreateModeratorsService(
        hashGenerater,
        createModeratorsRepository,
    );
    return new CreateModeratorsController(createModeratorsService);
};

export default makeCreateModeratorsContoller;
