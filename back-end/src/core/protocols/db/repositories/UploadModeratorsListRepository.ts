import Etherapy from '../../../entities/Etherapy';
import Moderator from '../../../entities/Moderator';
import Offer from '../../../entities/Offer';

type dto = {
    email: string;
    name: string;
    password: string;
    etherapies: Etherapy[];
};
export type params = {
    moderatorsData: dto[];

    offer: Offer;
};

export default interface UploadModeratorsListRepository {
    upload(data: params): Promise<Moderator[]>;
}
