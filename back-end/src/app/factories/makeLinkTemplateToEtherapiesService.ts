import LinkTemplateToEtherapiesService from '../../core/services/LinkTemplateToEtherapiesService';
import LinkTemplateToEtherapiesFakeRepository from '../../infra/db/typeorm/repositories/fakes/LinkTemplateToEtherapiesFakeRepository';
import LoadEtherapyByIdFakeRepository from '../../infra/db/typeorm/repositories/fakes/LoadEtherapyByIdFakeRepository';
import LoadTemplateByIdFakeRepository from '../../infra/db/typeorm/repositories/fakes/LoadTemplateByIdFakeRepository';

const makeLinkTemplateToEtherapiesService = (): LinkTemplateToEtherapiesService => {
    const LinkTemplateToEtherapiesRepository = new LinkTemplateToEtherapiesFakeRepository();
    const loadEtherapyByIdRepository = new LoadEtherapyByIdFakeRepository();
    const loadTemplateByIdRepository = new LoadTemplateByIdFakeRepository();

    const LinkTemplateToEtherapies = new LinkTemplateToEtherapiesService(
        LinkTemplateToEtherapiesRepository,
        loadTemplateByIdRepository,
        loadEtherapyByIdRepository,
    );

    return LinkTemplateToEtherapies;
};

export default makeLinkTemplateToEtherapiesService;
