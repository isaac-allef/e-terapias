import AppError from '../errors/AppError';
import LinkModeratorToEtherapyRepository from '../protocols/db/repositories/LinkModeratorToEtherapyRepository';
import LoadModeratorByIdRepository from '../protocols/db/repositories/LoadModeratorByIdRepository';
import LoadEtherapyByIdRepository from '../protocols/db/repositories/LoadEtherapyByIdRepository';

class LinkModeratorToEtherapyService {
    constructor(
        private linkModeratorToEtherapiesRepository: LinkModeratorToEtherapyRepository,
        private loadModeratorByIdRepository: LoadModeratorByIdRepository,
        private loadEtherapyByIdRepository: LoadEtherapyByIdRepository,
    ) {}

    public async execute(
        moderatorId: string,
        etherapyId: string,
    ): Promise<boolean> {
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

export default LinkModeratorToEtherapyService;
