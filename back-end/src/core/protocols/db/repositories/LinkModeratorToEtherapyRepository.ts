import Moderator from '../../../entities/Moderator';
import Etherapy from '../../../entities/Etherapy';

export default interface LinkModeratorToEtherapyRepository {
    link(moderator: Moderator, etherapy: Etherapy): Promise<boolean>;
}
