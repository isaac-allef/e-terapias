import LoadAllModeratorsService from '../../../../core/services/LoadAllModeratorsService';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { LoadAllModeratorsController } from '../../../../presentation/controllers/LoadAllModeratorsController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadAllModeratorsContoller = (): Controller => {
    const loadAllModeratorsRepository = new ModeratorTypeormRepository();
    const loadAllModeratorsService = new LoadAllModeratorsService(
        loadAllModeratorsRepository,
    );
    return new LoadAllModeratorsController(loadAllModeratorsService);
};

export default makeLoadAllModeratorsContoller;
