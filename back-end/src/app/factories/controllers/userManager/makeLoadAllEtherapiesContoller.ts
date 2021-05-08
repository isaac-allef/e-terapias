import LoadAllEtherapiesService from '../../../../core/services/LoadAllEtherapiesService';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import { LoadAllEtherapiesController } from '../../../../presentation/controllers/LoadAllEtherapiesController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadAllEtherapiesContoller = (): Controller => {
    const loadAllEtherapiesRepository = new EtherapyTypeormRepository();
    const loadAllEtherapiesService = new LoadAllEtherapiesService(
        loadAllEtherapiesRepository,
    );
    return new LoadAllEtherapiesController(loadAllEtherapiesService);
};

export default makeLoadAllEtherapiesContoller;
