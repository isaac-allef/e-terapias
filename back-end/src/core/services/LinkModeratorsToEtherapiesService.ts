import AppError from '../errors/AppError';
import LinkModeratorsToEtherapiesRepository from '../protocols/db/repositories/LinkModeratorsToEtherapiesRepository';
import LoadModeratorByIdRepository from '../protocols/db/repositories/LoadModeratorByIdRepository';
import LoadEtherapyByIdRepository from '../protocols/db/repositories/LoadEtherapyByIdRepository';

type dto = {
    moderatorId: string;
    etherapyId: string;
};

export type params = dto[];

class LinkModeratorsToEtherapiesService {
    constructor(
        private linkModeratorsToEtherapiesRepository: LinkModeratorsToEtherapiesRepository,
        private loadModeratorByIdRepository: LoadModeratorByIdRepository,
        private loadEtherapyByIdRepository: LoadEtherapyByIdRepository,
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
                        moderatorId: d.moderatorId,
                        etherapyId: d.etherapyId,
                    },
                );

                return moderatorAndEtherapy;
            }),
        );

        return moderatorsAndEtherapies;
    }

    private async loadModeratorAndEtherapy({ moderatorId, etherapyId }: dto) {
        const moderator = await this.loadModeratorByIdRepository.load(
            moderatorId,
        );

        if (!moderator) {
            throw new AppError('Moderator not found.');
        }

        const etherapy = await this.loadEtherapyByIdRepository.load(etherapyId);

        if (!etherapy) {
            throw new AppError('Etherapy not found.');
        }

        return {
            moderator,
            etherapy,
        };
    }
}

export default LinkModeratorsToEtherapiesService;
