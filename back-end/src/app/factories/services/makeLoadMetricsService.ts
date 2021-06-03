import LoadMetricsService from '../../../core/services/LoadMetricsService';
import EtherapyTypeormRepository from '../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import FieldJournalTypeormRepository from '../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import ModeratorTypeormRepository from '../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import TemplateTypeormRepository from '../../../infra/db/typeorm/repositories/TemplateTypeormRepository';

const makeLoadMetricsService = (): LoadMetricsService => {
    const countEtherapiesRepository = new EtherapyTypeormRepository();
    const countModeratorsRepository = new ModeratorTypeormRepository();
    const countFieldJournalsRepository = new FieldJournalTypeormRepository();
    const countTemplatesRepository = new TemplateTypeormRepository();

    return new LoadMetricsService(
        countEtherapiesRepository,
        countModeratorsRepository,
        countFieldJournalsRepository,
        countTemplatesRepository,
    );
};

export default makeLoadMetricsService;
