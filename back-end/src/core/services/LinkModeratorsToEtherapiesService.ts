import AppError from '../errors/AppError';
import LinkModeratorToEtherapyRepository from '../protocols/db/repositories/LinkModeratorToEtherapyRepository';
import LoadModeratorByIdRepository from '../protocols/db/repositories/LoadModeratorByIdRepository';
import LoadEtherapyByIdRepository from '../protocols/db/repositories/LoadEtherapyByIdRepository';

type dto = {
    moderatorId: string;
    etherapyId: string;
};

export type params = dto[];

class LinkModeratorsToEtherapiesService {
    constructor(
        private linkModeratorToEtherapiesRepository: LinkModeratorToEtherapyRepository,
        private loadModeratorByIdRepository: LoadModeratorByIdRepository,
        private loadEtherapyByIdRepository: LoadEtherapyByIdRepository,
    ) {}

    public async execute(data: params): Promise<boolean[]> {
        const isLinkedList = await Promise.all(
            data.map(async d => {
                const isLinked = await this.linkModeratorToEtherapy({
                    moderatorId: d.moderatorId,
                    etherapyId: d.etherapyId,
                });

                return isLinked;
            }),
        );

        return isLinkedList;
    }

    private async linkModeratorToEtherapy({ moderatorId, etherapyId }: dto) {
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

        const isLinked = await this.linkModeratorToEtherapiesRepository.link(
            moderator,
            etherapy,
        );

        return isLinked;
    }
}

export default LinkModeratorsToEtherapiesService;
