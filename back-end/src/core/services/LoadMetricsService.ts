import CountEtherapiesRepository from '../protocols/db/repositories/CountEtherapiesRepository';
import CountFieldJournalsRepository from '../protocols/db/repositories/CountFieldJournalsRepository';
import CountModeratorsRepository from '../protocols/db/repositories/CountModeratorsRepository';
import CountTemplatesRepository from '../protocols/db/repositories/CountTemplatesRepository';

type countBody = {
    begin: Date;
    end: Date;
    count: number;
};

type metrics = {
    numberOfEtherapies: number;
    numberOfModerators: number;
    numberOfFieldJournals: number;
    templatesNumber: number;
    numberOfFieldJournalsLastFourWeeks?: {
        lastWeek: countBody;
        beforeLastWeek: countBody;
        threeWeeksAgo: countBody;
        fourWeeksAgo: countBody;
    };
};

type params = {
    numberOfFieldJournalsLastFourWeeks: Date;
};

class LoadMetricsService {
    constructor(
        private countEtherapies: CountEtherapiesRepository,
        private countModerators: CountModeratorsRepository,
        private countFieldJournals: CountFieldJournalsRepository,
        private countTemplates: CountTemplatesRepository,
    ) {}

    public async execute(data?: params): Promise<metrics> {
        const numberOfEtherapies = await this.countEtherapies.count();
        const numberOfModerators = await this.countModerators.count();
        const numberOfFieldJournals = await this.countFieldJournals.count();
        const templatesNumber = await this.countTemplates.count();

        if (!data?.numberOfFieldJournalsLastFourWeeks) {
            return {
                numberOfEtherapies,
                numberOfModerators,
                numberOfFieldJournals,
                templatesNumber,
            };
        }

        const lastWeekDate = (date: Date) => {
            return new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() - 7,
            );
        };

        const today = new Date();
        const lastWeek = lastWeekDate(today);
        const beforeLastWeek = lastWeekDate(lastWeek);
        const threeWeeksAgo = lastWeekDate(beforeLastWeek);
        const fourWeeksAgo = lastWeekDate(threeWeeksAgo);

        const numberOfFieldJournalsLastWeek = await this.countFieldJournals.count(
            { begin: lastWeek, end: today },
        );
        const numberOfFieldJournalsBeforeLastWeek = await this.countFieldJournals.count(
            { begin: beforeLastWeek, end: lastWeek },
        );
        const numberOfFieldJournalsThreeWeeksAgo = await this.countFieldJournals.count(
            { begin: threeWeeksAgo, end: beforeLastWeek },
        );
        const numberOfFieldJournalsFourWeeksAgo = await this.countFieldJournals.count(
            { begin: fourWeeksAgo, end: threeWeeksAgo },
        );

        return {
            numberOfEtherapies,
            numberOfModerators,
            numberOfFieldJournals,
            templatesNumber,
            numberOfFieldJournalsLastFourWeeks: {
                lastWeek: {
                    begin: lastWeek,
                    end: today,
                    count: numberOfFieldJournalsLastWeek,
                },
                beforeLastWeek: {
                    begin: beforeLastWeek,
                    end: lastWeek,
                    count: numberOfFieldJournalsBeforeLastWeek,
                },
                threeWeeksAgo: {
                    begin: threeWeeksAgo,
                    end: beforeLastWeek,
                    count: numberOfFieldJournalsThreeWeeksAgo,
                },
                fourWeeksAgo: {
                    begin: fourWeeksAgo,
                    end: threeWeeksAgo,
                    count: numberOfFieldJournalsFourWeeksAgo,
                },
            },
        };
    }
}

export default LoadMetricsService;
