import UploadEtherapiesListService from '../../../../core/services/UploadEtherapiesListService';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import { UploadEtherapiesListController } from '../../../../presentation/controllers/UploadEtherapiesListController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeUploadEtherapiesListContoller = (): Controller => {
    const uploadEtherapiesListRepository = new EtherapyTypeormRepository();
    const uploadEtherapiesListService = new UploadEtherapiesListService(
        uploadEtherapiesListRepository,
    );
    return new UploadEtherapiesListController(uploadEtherapiesListService);
};

export default makeUploadEtherapiesListContoller;
