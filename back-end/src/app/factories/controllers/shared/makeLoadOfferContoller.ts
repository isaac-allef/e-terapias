import LoadOfferByIdService from '../../../../core/services/LoadOfferByIdService';
import OfferTypeormRepository from '../../../../infra/db/typeorm/repositories/OfferTypeormRepository';
import { LoadOfferController } from '../../../../presentation/controllers/LoadOfferController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadOfferContoller = (): Controller => {
    const loadOfferRepository = new OfferTypeormRepository();
    const loadOfferByIdService = new LoadOfferByIdService(loadOfferRepository);
    return new LoadOfferController(loadOfferByIdService);
};

export default makeLoadOfferContoller;
