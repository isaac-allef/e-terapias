import Etherapy from '../entities/Etherapy';
import LoadOfferByIdRepository from '../protocols/db/repositories/LoadOfferByIdRepository';
import UploadEtherapiesListRepository from '../protocols/db/repositories/UploadEtherapiesListRepository';

type dto = {
    identifier: string;

    name: string;
};

export type params = {
    etherapiesData: dto[];

    offerId: string;
};

class UploadEtherapiesListService {
    constructor(
        private uploadEtherapiesListRepository: UploadEtherapiesListRepository,
        private loadOfferByIdRepository: LoadOfferByIdRepository,
    ) {}

    public async execute(data: params): Promise<Etherapy[]> {
        const { etherapiesData, offerId } = data;

        const offer = await this.loadOfferByIdRepository.load(offerId);

        const etherapies = await this.uploadEtherapiesListRepository.upload({
            etherapiesData,
            offer,
        });

        return etherapies;
    }
}

export default UploadEtherapiesListService;
