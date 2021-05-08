import SearchEtherapiesService from '../../../../core/services/SearchEtherapiesService';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import { SearchEtherapiesController } from '../../../../presentation/controllers/SearchEtherapiesController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeSearchEtherapiesContoller = (): Controller => {
    const searchEtherapiesRepository = new EtherapyTypeormRepository();
    const searchEtherapiesService = new SearchEtherapiesService(
        searchEtherapiesRepository,
    );
    return new SearchEtherapiesController(searchEtherapiesService);
};

export default makeSearchEtherapiesContoller;
