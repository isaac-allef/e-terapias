import CreateEtherapyService from '../../core/services/CreateEtherapyService';
import CreateEtherapyFakeRepository from '../../infra/db/typeorm/repositories/fakes/CreateEtherapyFakeRepository';

const makeCreateEtherapyService = (): CreateEtherapyService => {
    const createEtherapyRepository = new CreateEtherapyFakeRepository();

    const createEtherapy = new CreateEtherapyService(createEtherapyRepository);

    return createEtherapy;
};

export default makeCreateEtherapyService;
