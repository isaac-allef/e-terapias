import UpdateOfferService from '../../../../core/services/UpdateOfferService';
import OfferTypeormRepository from '../../../../infra/db/typeorm/repositories/OfferTypeormRepository';
import { UpdateOfferController } from '../../../../presentation/controllers/UpdateOfferController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeUpdateOfferController = (): Controller => {
    const updateOfferRepository = new OfferTypeormRepository();
    const updateOfferService = new UpdateOfferService(updateOfferRepository);
    return new UpdateOfferController(updateOfferService);
};

export default makeUpdateOfferController;
