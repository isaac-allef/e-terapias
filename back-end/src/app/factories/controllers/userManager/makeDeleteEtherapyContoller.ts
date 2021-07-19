import DeleteEtherapyByIdService from '../../../../core/services/DeleteEtherapyByIdService';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import { DeleteEtherapyController } from '../../../../presentation/controllers/DeleteEtherapyController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeDeleteEtherapyContoller = (): Controller => {
    const updateTemplateRepository = new EtherapyTypeormRepository();
    const deleteEtherapyByIdService = new DeleteEtherapyByIdService(
        updateTemplateRepository,
    );
    return new DeleteEtherapyController(deleteEtherapyByIdService);
};

export default makeDeleteEtherapyContoller;
