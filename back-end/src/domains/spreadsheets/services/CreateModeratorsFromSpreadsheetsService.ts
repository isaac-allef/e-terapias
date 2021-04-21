import ISpreadsheetsRepository from '../repositories/ISpreadsheetsRepository';
import CreateModeratorService from '../../moderators/services/CreateModeratorService';
import IModeratorRepository from '../../moderators/repositories/IModeratorRepository';
import IHashProvider from '../../../shared/providers/HashProvider/models/IHashProvider';

class CreateModeratorsFromSpreadsheetsService {
    constructor(
        private spreadsheetsRepository: ISpreadsheetsRepository,
        private moderatorRepository: IModeratorRepository,
        private hashProvider: IHashProvider,
    ) {}

    public async execute(): Promise<unknown[]> {
        const moderators = await this.spreadsheetsRepository.getPageRows();

        const createModerator = new CreateModeratorService(
            this.moderatorRepository,
            this.hashProvider,
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        moderators.forEach(async (moderator: any) => {
            try {
                await createModerator.execute({
                    email: moderator['Endereço de e-mail'],
                    password: '1234',
                });
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log({ error: err });
            }
        });

        return moderators;
    }
}

export default CreateModeratorsFromSpreadsheetsService;
