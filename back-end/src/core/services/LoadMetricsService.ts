import CountEtherapiesRepository from '../protocols/db/repositories/CountEtherapiesRepository';
import CountFieldJournalsRepository from '../protocols/db/repositories/CountFieldJournalsRepository';
import CountModeratorsRepository from '../protocols/db/repositories/CountModeratorsRepository';
import CountTemplatesRepository from '../protocols/db/repositories/CountTemplatesRepository';

export type metrics = {
    etherapiesNumber: number;
    moderatorsNumber: number;
    fieldJournalsNumber: number;
    templatesNumber: number;
};

class LoadMetricsService {
    constructor(
        private countEtherapies: CountEtherapiesRepository,
        private countModerators: CountModeratorsRepository,
        private countFieldJournals: CountFieldJournalsRepository,
        private countTemplates: CountTemplatesRepository,
    ) {}

    public async execute(): Promise<metrics> {
        const etherapiesNumber = await this.countEtherapies.count();
        const moderatorsNumber = await this.countModerators.count();
        const fieldJournalsNumber = await this.countFieldJournals.count();
        const templatesNumber = await this.countTemplates.count();

        return {
            etherapiesNumber,
            moderatorsNumber,
            fieldJournalsNumber,
            templatesNumber,
        };
    }
}

export default LoadMetricsService;
