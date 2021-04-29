import Moderator from '../entities/Moderator';
import HashGenerater from '../protocols/cryptography/HashGenerater';
import CreateModeratorRepository from '../protocols/db/repositories/CreateModeratorRepository';

type dto = {
    email: string;
    name: string;
};

export type params = dto[];

class CreateModeratorsService {
    constructor(
        private hashGenerater: HashGenerater,
        private createModeratorRepository: CreateModeratorRepository,
    ) {}

    public async execute(data: params): Promise<Moderator[]> {
        const moderators = await Promise.all(
            data.map(async d => {
                const randomPassword = '1234';
                const passwordHashed = await this.hashGenerater.generate(
                    randomPassword,
                );
                const moderator = await this.createModeratorRepository.create({
                    email: d.email,
                    name: d.name,
                    password: passwordHashed,
                });

                return moderator;
            }),
        );

        return moderators;
    }
}

export default CreateModeratorsService;
