import LinkModeratorsToEtherapiesRepository from '../protocols/db/repositories/LinkModeratorsToEtherapiesRepository';
import LoadModeratorByEmailRepository from '../protocols/db/repositories/LoadModeratorByEmailRepository';
import LoadEtherapyByIdentifierRepository from '../protocols/db/repositories/LoadEtherapyByIdentifierRepository';

type dto = {
    moderatorEmail: string;
    etherapyIdentifier: string;
};

export type params = dto[];

class LinkModeratorsToEtherapiesService {
    constructor(
        private linkModeratorsToEtherapiesRepository: LinkModeratorsToEtherapiesRepository,
        private loadModeratorByEmailRepository: LoadModeratorByEmailRepository,
        private loadEtherapyByIdentifierRepository: LoadEtherapyByIdentifierRepository,
    ) {}

    public async execute(data: params): Promise<boolean> {
        const moderatorsAndEtherapies = await this.loadModeratorsAndEtherapies(
            data,
        );

        const isLinked = await this.linkModeratorsToEtherapiesRepository.link(
            moderatorsAndEtherapies,
        );

        return isLinked;
    }

    private async loadModeratorsAndEtherapies(data: params) {
        const moderatorsAndEtherapies = await Promise.all(
            data.map(async d => {
                const moderatorAndEtherapy = await this.loadModeratorAndEtherapy(
                    {
                        moderatorEmail: d.moderatorEmail,
                        etherapyIdentifier: d.etherapyIdentifier,
                    },
                );

                return moderatorAndEtherapy;
            }),
        );

        return moderatorsAndEtherapies;
    }

    private async loadModeratorAndEtherapy({
        moderatorEmail,
        etherapyIdentifier,
    }: dto) {
        const moderator = await this.loadModeratorByEmailRepository.loadByEmail(
            moderatorEmail,
        );

        const etherapy = await this.loadEtherapyByIdentifierRepository.loadByIdentifier(
            etherapyIdentifier,
        );

        return {
            moderator,
            etherapy,
        };
    }
}

export default LinkModeratorsToEtherapiesService;
