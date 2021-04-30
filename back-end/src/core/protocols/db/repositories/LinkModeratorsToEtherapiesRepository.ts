import Moderator from '../../../entities/Moderator';
import Etherapy from '../../../entities/Etherapy';

type dto = {
    moderator: Moderator;
    etherapy: Etherapy;
};

export type params = dto[];

export default interface LinkModeratorsToEtherapiesRepository {
    link(data: params): Promise<boolean>;
}
