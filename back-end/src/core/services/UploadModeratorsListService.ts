import Moderator from '../entities/Moderator';
import HashGenerater from '../protocols/cryptography/HashGenerater';
import UploadModeratorsListRepository from '../protocols/db/repositories/UploadModeratorsListRepository';
import LoadManyEtherapiesByIdentifierRepository from '../protocols/db/repositories/LoadManyEtherapiesByIdentifierRepository';
import LoadOfferByIdRepository from '../protocols/db/repositories/LoadOfferByIdRepository';

type dto = {
    email: string;
    name: string;
    etherapiesIdentifiers: string[];
};

export type params = {
    moderatorsData: dto[];

    offerId: string;
};

class UploadModeratorsListService {
    constructor(
        private hashGenerater: HashGenerater,
        private uploadModeratorsListRepository: UploadModeratorsListRepository,
        private loadManyEtherapiesByIdentifiersRepository: LoadManyEtherapiesByIdentifierRepository,
        private loadOfferByIdRepository: LoadOfferByIdRepository,
    ) {}

    public async execute(data: params): Promise<Moderator[]> {
        const { moderatorsData, offerId } = data;

        const offer = await this.loadOfferByIdRepository.load(offerId);

        const moderatorsParams = await Promise.all(
            moderatorsData.map(async (d: dto) => {
                const moderatorParam = {
                    email: d.email,
                    name: d.name,
                    password: await this.generateRandomPassword(),
                    etherapies: await this.loadManyEtherapiesByIdentifiersRepository.loadManyByIdentifiers(
                        d.etherapiesIdentifiers,
                        offerId,
                    ),
                };

                return moderatorParam;
            }),
        );

        const moderators = await this.uploadModeratorsListRepository.upload({
            moderatorsData: moderatorsParams,
            offer,
        });

        return moderators;
    }

    private async generateRandomPassword(): Promise<string> {
        const randomPassword = '1234';
        const passwordHashed = await this.hashGenerater.generate(
            randomPassword,
        );
        return passwordHashed;
    }
}

export default UploadModeratorsListService;
