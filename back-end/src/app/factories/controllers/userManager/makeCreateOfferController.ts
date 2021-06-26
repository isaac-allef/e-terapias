import CreateOfferService from '../../../../core/services/CreateOfferService';
import OfferTypeormRepository from '../../../../infra/db/typeorm/repositories/OfferTypeormRepository';
import { CreateOfferController } from '../../../../presentation/controllers/CreateOfferController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeCreateOfferController = (): Controller => {
    const createOfferRepository = new OfferTypeormRepository();
    const createOfferService = new CreateOfferService(createOfferRepository);
    return new CreateOfferController(createOfferService);
};

export default makeCreateOfferController;
