import LoadEtherapyByIdService from '../../core/services/LoadEtherapyByIdService';
import LoadEtherapyByIdFakeRepository from '../../infra/db/typeorm/repositories/fakes/LoadEtherapyByIdFakeRepository';

const makeLoadEtherapyByIdService = (): LoadEtherapyByIdService => {
    const LoadEtherapyByIdRepository = new LoadEtherapyByIdFakeRepository();

    const LoadEtherapyById = new LoadEtherapyByIdService(
        LoadEtherapyByIdRepository,
    );

    return LoadEtherapyById;
};

export default makeLoadEtherapyByIdService;
