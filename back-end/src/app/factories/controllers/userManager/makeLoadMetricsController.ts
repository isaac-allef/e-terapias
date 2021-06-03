import { Controller } from '../../../../presentation/protocols/controller';
import { LoadMetricsController } from '../../../../presentation/controllers/LoadMetricsController';
import makeLoadMetricsService from '../../services/makeLoadMetricsService';

const makeLoadMetricsContoller = (): Controller => {
    const loadMetricsService = makeLoadMetricsService();
    return new LoadMetricsController(loadMetricsService);
};

export default makeLoadMetricsContoller;
