import CreateModeratorsService from '../../../../core/services/CreateModeratorsService';
import BcryptAdapter from '../../../../infra/cryptography/bcryptAdapter';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { CreateModeratorsController } from '../../../../presentation/controllers/CreateModeratorsController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeCreateModeratorsContoller = (): Controller => {
    const hashGenerater = new BcryptAdapter(12);
    const createModeratorsRepository = new ModeratorTypeormRepository();
    const linkModeratorsToEtherapiesRepository = new EtherapyTypeormRepository();
    const createModeratorsService = new CreateModeratorsService(
        hashGenerater,
        createModeratorsRepository,
        linkModeratorsToEtherapiesRepository,
    );
    return new CreateModeratorsController(createModeratorsService);
};

export default makeCreateModeratorsContoller;
