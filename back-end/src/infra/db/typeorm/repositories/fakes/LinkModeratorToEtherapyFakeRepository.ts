import Etherapy from '../../../../../core/entities/Etherapy';
import Moderator from '../../../../../core/entities/Moderator';
import LinkModeratorToEtherapyRepository from '../../../../../core/protocols/db/repositories/LinkModeratorToEtherapyRepository';

class LinkModeratorToEtherapyFakeRepository
    implements LinkModeratorToEtherapyRepository {
    async link(moderator: Moderator, etherapy: Etherapy): Promise<boolean> {
        moderator.etherapies.push(etherapy);
        etherapy.moderators.push(moderator);

        return true;
    }
}

export default LinkModeratorToEtherapyFakeRepository;
