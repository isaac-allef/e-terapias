import LinkModeratorsToEtherapiesRepository from '../protocols/db/repositories/LinkModeratorsToEtherapiesRepository';
import LoadModeratorByEmailRepository from '../protocols/db/repositories/LoadModeratorByEmailRepository';

type dto = {
    moderatorEmail: string;
    etherapyIdentifier: string;
};

export type params = dto[];

class LinkModeratorsToEtherapiesService {
    constructor(
        private linkModeratorsToEtherapiesRepository: LinkModeratorsToEtherapiesRepository,
        private loadModeratorByEmailRepository: LoadModeratorByEmailRepository,
    ) {}

    public async execute(data: params): Promise<boolean> {
        const newData = await this.processData(data);

        const isLinked = await this.linkModeratorsToEtherapiesRepository.link(
            newData,
        );

        return isLinked;
    }

    private async processData(data: params) {
        const newData = await Promise.all(
            data.map(async d => {
                const moderator = await this.loadModeratorByEmailRepository.loadByEmail(
                    d.moderatorEmail,
                );

                return {
                    moderator,
                    etherapyIdentifier: d.etherapyIdentifier,
                };
            }),
        );

        return newData;
    }
}

export default LinkModeratorsToEtherapiesService;
