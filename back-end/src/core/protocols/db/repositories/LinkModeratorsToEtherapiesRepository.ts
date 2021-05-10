import Moderator from '../../../entities/Moderator';

type dto = {
    moderator: Moderator;
    etherapyIdentifier: string;
};

export type params = dto[];

export default interface LinkModeratorsToEtherapiesRepository {
    link(data: params): Promise<boolean>;
}
