import LinkTemplateToEtherapiesService from '../../../../core/services/LinkTemplateToEtherapiesService';
import TemplateTypeormRepository from '../../../../infra/db/typeorm/repositories/TemplateTypeormRepository';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import { LinkTemplateToEtherapiesController } from '../../../../presentation/controllers/LinkTemplateToEtherapiesController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLinkTemplateToEtherapiesContoller = (): Controller => {
    const linkTemplateToEtherapiesRepository = new EtherapyTypeormRepository();
    const loadTemplateRepository = new TemplateTypeormRepository();
    const linkTemplateToEtherapiesService = new LinkTemplateToEtherapiesService(
        linkTemplateToEtherapiesRepository,
        loadTemplateRepository,
    );
    return new LinkTemplateToEtherapiesController(
        linkTemplateToEtherapiesService,
    );
};

export default makeLinkTemplateToEtherapiesContoller;
