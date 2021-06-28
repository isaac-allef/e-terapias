import UploadEtherapiesListService from '../../../../core/services/UploadEtherapiesListService';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import OfferTypeormRepository from '../../../../infra/db/typeorm/repositories/OfferTypeormRepository';
import { UploadEtherapiesListController } from '../../../../presentation/controllers/UploadEtherapiesListController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeUploadEtherapiesListContoller = (): Controller => {
    const uploadEtherapiesListRepository = new EtherapyTypeormRepository();
    const loadOfferByIdRepository = new OfferTypeormRepository();
    const uploadEtherapiesListService = new UploadEtherapiesListService(
        uploadEtherapiesListRepository,
        loadOfferByIdRepository,
    );
    return new UploadEtherapiesListController(uploadEtherapiesListService);
};

export default makeUploadEtherapiesListContoller;
