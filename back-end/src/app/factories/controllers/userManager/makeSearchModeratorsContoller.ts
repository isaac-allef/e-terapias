import SearchModeratorsService from '../../../../core/services/SearchModeratorsService';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { SearchModeratorsController } from '../../../../presentation/controllers/SearchModeratorsController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeSearchModeratorsContoller = (): Controller => {
    const searchModeratorsRepository = new ModeratorTypeormRepository();
    const searchModeratorsService = new SearchModeratorsService(
        searchModeratorsRepository,
    );
    return new SearchModeratorsController(searchModeratorsService);
};

export default makeSearchModeratorsContoller;
