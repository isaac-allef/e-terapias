import LoadEtherapyByIdService from '../../core/services/LoadEtherapyByIdService';
import EtherapyTypeormRepository from '../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import { LoadEtherapyController } from '../../presentation/controllers/LoadEtherapyController';
import { Controller } from '../../presentation/protocols/controller';

const makeLoadEtherapyContoller = (): Controller => {
    const loadEtherapyRepository = new EtherapyTypeormRepository();
    const loadEtherapyByIdService = new LoadEtherapyByIdService(
        loadEtherapyRepository,
    );
    return new LoadEtherapyController(loadEtherapyByIdService);
};

export default makeLoadEtherapyContoller;
