import Etherapy from '../entities/Etherapy';
import UploadEtherapiesListRepository from '../protocols/db/repositories/UploadEtherapiesListRepository';

type dto = {
    identifier: string;

    name: string;
};

export type params = dto[];

class UploadEtherapiesListService {
    constructor(
        private uploadEtherapiesListRepository: UploadEtherapiesListRepository,
    ) {}

    public async execute(data: params): Promise<Etherapy[]> {
        const etherapies = await this.uploadEtherapiesListRepository.upload(
            data,
        );

        return etherapies;
    }
}

export default UploadEtherapiesListService;
