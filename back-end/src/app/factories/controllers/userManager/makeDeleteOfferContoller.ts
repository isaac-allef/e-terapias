import DeleteOfferByIdService from '../../../../core/services/DeleteOfferByIdService';
import OfferTypeormRepository from '../../../../infra/db/typeorm/repositories/OfferTypeormRepository';
import { DeleteOfferController } from '../../../../presentation/controllers/DeleteOfferController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeDeleteOfferContoller = (): Controller => {
    const updateTemplateRepository = new OfferTypeormRepository();
    const deleteOfferByIdService = new DeleteOfferByIdService(
        updateTemplateRepository,
    );
    return new DeleteOfferController(deleteOfferByIdService);
};

export default makeDeleteOfferContoller;
