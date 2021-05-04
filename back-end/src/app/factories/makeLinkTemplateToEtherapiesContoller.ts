import LinkTemplateToEtherapiesService from '../../core/services/LinkTemplateToEtherapiesService';
import TemplateTypeormRepository from '../../infra/db/typeorm/repositories/TemplateTypeormRepository';
import EtherapyTypeormRepository from '../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import { LinkTemplateToEtherapiesController } from '../../presentation/controllers/LinkTemplateToEtherapiesController';
import { Controller } from '../../presentation/protocols/controller';

const makeLinkTemplateToEtherapiesContoller = (): Controller => {
    const linkTemplateToEtherapiesRepository = new EtherapyTypeormRepository();
    const loadTemplateRepository = new TemplateTypeormRepository();
    const loadEtherapyRepository = new EtherapyTypeormRepository();
    const linkTemplateToEtherapiesService = new LinkTemplateToEtherapiesService(
        linkTemplateToEtherapiesRepository,
        loadTemplateRepository,
        loadEtherapyRepository,
    );
    return new LinkTemplateToEtherapiesController(
        linkTemplateToEtherapiesService,
    );
};

export default makeLinkTemplateToEtherapiesContoller;
