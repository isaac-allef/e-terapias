import UploadModeratorsListService from '../../../../core/services/UploadModeratorsListService';
import BcryptAdapter from '../../../../infra/cryptography/bcryptAdapter';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { UploadModeratorsListController } from '../../../../presentation/controllers/UploadModeratorsListController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeUploadModeratorsListContoller = (): Controller => {
    const hashGenerater = new BcryptAdapter(12);
    const uploadModeratorsListRepository = new ModeratorTypeormRepository();
    const loadManyEtherapiesByIdentifiersRepository = new EtherapyTypeormRepository();
    const uploadModeratorsListService = new UploadModeratorsListService(
        hashGenerater,
        uploadModeratorsListRepository,
        loadManyEtherapiesByIdentifiersRepository,
    );
    return new UploadModeratorsListController(uploadModeratorsListService);
};

export default makeUploadModeratorsListContoller;
