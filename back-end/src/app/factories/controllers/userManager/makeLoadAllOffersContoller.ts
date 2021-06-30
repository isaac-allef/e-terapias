import LoadAllOffersService from '../../../../core/services/LoadAllOffersService';
import OfferTypeormRepository from '../../../../infra/db/typeorm/repositories/OfferTypeormRepository';
import { LoadAllOffersController } from '../../../../presentation/controllers/LoadAllOffersController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadAllOffersContoller = (): Controller => {
    const loadAllOffersRepository = new OfferTypeormRepository();
    const loadAllOffersService = new LoadAllOffersService(
        loadAllOffersRepository,
    );
    return new LoadAllOffersController(loadAllOffersService);
};

export default makeLoadAllOffersContoller;
