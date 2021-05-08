import LinkModeratorsToEtherapiesService from '../../../core/services/LinkModeratorsToEtherapiesService';
import ModeratorTypeormRepository from '../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import EtherapyTypeormRepository from '../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import { LinkModeratorsToEtherapiesController } from '../../../presentation/controllers/LinkModeratorsToEtherapiesController';
import { Controller } from '../../../presentation/protocols/controller';

const makeLinkModeratorsToEtherapiesContoller = (): Controller => {
    const linkModeratorsToEtherapiesRepository = new EtherapyTypeormRepository();
    const loadModeratorRepository = new ModeratorTypeormRepository();
    const loadEtherapyRepository = new EtherapyTypeormRepository();
    const linkModeratorsToEtherapiesService = new LinkModeratorsToEtherapiesService(
        linkModeratorsToEtherapiesRepository,
        loadModeratorRepository,
        loadEtherapyRepository,
    );
    return new LinkModeratorsToEtherapiesController(
        linkModeratorsToEtherapiesService,
    );
};

export default makeLinkModeratorsToEtherapiesContoller;
