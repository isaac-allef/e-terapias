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

        if (!moderators) {
            throw new AppError('Create moderators fail.');
        }

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
