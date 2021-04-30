import Moderator from '../entities/Moderator';
import AppError from '../errors/AppError';
import HashGenerater from '../protocols/cryptography/HashGenerater';
import CreateModeratorsRepository from '../protocols/db/repositories/CreateModeratorsRepository';

type dto = {
    email: string;
    name: string;
};

export type params = dto[];

class CreateModeratorsService {
    constructor(
        private hashGenerater: HashGenerater,
        private createModeratorsRepository: CreateModeratorsRepository,
    ) {}

    public async execute(data: params): Promise<Moderator[]> {
        const moderatorsParams = await Promise.all(
            data.map(async (d: dto) => {
                const randomPassword = '1234';
                const passwordHashed = await this.hashGenerater.generate(
                    randomPassword,
                );
                const moderatorParam = {
                    email: d.email,
                    name: d.name,
                    password: passwordHashed,
                };

                return moderatorParam;
            }),
        );

        const moderators = await this.createModeratorsRepository.create(
            moderatorsParams,
        );

        if (!moderators) {
            throw new AppError('Create moderators fail.');
        }

        return moderators;
    }
}

export default CreateModeratorsService;
