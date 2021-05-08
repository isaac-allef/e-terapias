import CreateEtherapiesService from '../../../../core/services/CreateEtherapiesService';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import { CreateEtherapiesController } from '../../../../presentation/controllers/CreateEtherapiesController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeCreateEtherapiesContoller = (): Controller => {
    const createEtherapiesRepository = new EtherapyTypeormRepository();
    const createEtherapiesService = new CreateEtherapiesService(
        createEtherapiesRepository,
    );
    return new CreateEtherapiesController(createEtherapiesService);
};

export default makeCreateEtherapiesContoller;
