import LinkModeratorToEtherapyService from '../../core/services/LinkModeratorToEtherapyService';
import LinkModeratorToEtherapyFakeRepository from '../../infra/db/typeorm/repositories/fakes/LinkModeratorToEtherapyFakeRepository';
import LoadEtherapyByIdFakeRepository from '../../infra/db/typeorm/repositories/fakes/LoadEtherapyByIdFakeRepository';
import LoadModeratorByIdFakeRepository from '../../infra/db/typeorm/repositories/fakes/LoadModeratorByIdFakeRepository';

const makeLinkModeratorToEtherapyService = (): LinkModeratorToEtherapyService => {
    const LinkModeratorToEtherapyRepository = new LinkModeratorToEtherapyFakeRepository();
    const loadModeratorByIdRepository = new LoadModeratorByIdFakeRepository();
    const loadEtherapyByIdRepository = new LoadEtherapyByIdFakeRepository();

    const LinkModeratorToEtherapy = new LinkModeratorToEtherapyService(
        LinkModeratorToEtherapyRepository,
        loadModeratorByIdRepository,
        loadEtherapyByIdRepository,
    );

    return LinkModeratorToEtherapy;
};

export default makeLinkModeratorToEtherapyService;
