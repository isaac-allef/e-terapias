import Etherapy from '../../../entities/Etherapy';
import Offer from '../../../entities/Offer';

type dto = {
    identifier: string;

    name: string;
};

export type params = {
    etherapiesData: dto[];

    offer: Offer;
};

export default interface UploadEtherapiesListRepository {
    upload(data: params): Promise<Etherapy[]>;
}
