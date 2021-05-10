import Moderator from '../entities/Moderator';
import HashGenerater from '../protocols/cryptography/HashGenerater';
import CreateModeratorsRepository from '../protocols/db/repositories/CreateModeratorsRepository';
import LinkModeratorsToEtherapiesRepository from '../protocols/db/repositories/LinkModeratorsToEtherapiesRepository';

type dtoLink = {
    moderatorEmail: string;
    etherapyIdentifier: string;
};

type dto = {
    email: string;
    name: string;
};

export type params = {
    data: dto[];
    links: dtoLink[];
};

class CreateModeratorsService {
    constructor(
        private hashGenerater: HashGenerater,
        private createModeratorsRepository: CreateModeratorsRepository,
        private linkModeratorsToEtherapiesRepository: LinkModeratorsToEtherapiesRepository,
    ) {}

    public async execute({ data, links }: params): Promise<Moderator[]> {
        const moderatorsParams = await Promise.all(
            data.map(async (d: dto) => {
                const moderatorParam = {
                    email: d.email,
                    name: d.name,
                    password: await this.generateRandomPassword(),
                };

                return moderatorParam;
            }),
        );

        const moderators = await this.createModeratorsRepository.create(
            moderatorsParams,
        );

        const dataLinks = this.processDataLinks(moderators, links);

        await this.linkModeratorsToEtherapiesRepository.link(dataLinks);

        return moderators;
    }

    private async generateRandomPassword(): Promise<string> {
        const randomPassword = '1234';
        const passwordHashed = await this.hashGenerater.generate(
            randomPassword,
        );
        return passwordHashed;
    }

    private processDataLinks(
        moderators: Moderator[],
        links: dtoLink[],
    ): { moderator: Moderator; etherapyIdentifier: string }[] {
        const newData = links.map(link => {
            const moderator = moderators.find(
                m => m.email === link.moderatorEmail,
            );

            if (!moderator) {
                throw new Error(
                    `This email (${link.moderatorEmail}) does not belong to any moderator on that list`,
                );
            }

            return {
                moderator,
                etherapyIdentifier: link.etherapyIdentifier,
            };
        });

        return newData;
    }
}

export default CreateModeratorsService;
