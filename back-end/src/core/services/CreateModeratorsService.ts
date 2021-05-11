import Moderator from '../entities/Moderator';
import HashGenerater from '../protocols/cryptography/HashGenerater';
import CreateModeratorsRepository from '../protocols/db/repositories/CreateModeratorsRepository';
import LoadManyEtherapiesByIdentifierRepository from '../protocols/db/repositories/LoadManyEtherapiesByIdentifierRepository';

type dto = {
    email: string;
    name: string;
    etherapiesIdentifiers: string[];
};

export type params = dto[];

class CreateModeratorsService {
    constructor(
        private hashGenerater: HashGenerater,
        private createModeratorsRepository: CreateModeratorsRepository,
        private loadManyEtherapiesByIdentifiersRepository: LoadManyEtherapiesByIdentifierRepository,
    ) {}

    public async execute(data: params): Promise<Moderator[]> {
        const moderatorsParams = await Promise.all(
            data.map(async (d: dto) => {
                const moderatorParam = {
                    email: d.email,
                    name: d.name,
                    password: await this.generateRandomPassword(),
                    etherapies: await this.loadManyEtherapiesByIdentifiersRepository.loadManyByIdentifiers(
                        d.etherapiesIdentifiers,
                    ),
                };

                return moderatorParam;
            }),
        );

        const moderators = await this.createModeratorsRepository.create(
            moderatorsParams,
        );

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

export default CreateModeratorsService;
