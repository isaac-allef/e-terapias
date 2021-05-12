import HashComparer from '../protocols/cryptography/HashComparer';
import HashGenerater from '../protocols/cryptography/HashGenerater';
import ChangePasswordModeratorRepository from '../protocols/db/repositories/ChangePasswordModeratorRepository';
import LoadModeratorByIdRepository from '../protocols/db/repositories/LoadModeratorByIdRepository';

export type params = {
    id: string;
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
};

class ChangePasswordModeratorService {
    constructor(
        private hashGenerater: HashGenerater,
        private hashComparer: HashComparer,
        private loadModeratorRepository: LoadModeratorByIdRepository,
        private changePasswordModeratorRepository: ChangePasswordModeratorRepository,
    ) {}

    public async execute({
        id,
        currentPassword,
        newPassword,
        newPasswordConfirmation,
    }: params): Promise<boolean> {
        const moderator = await this.loadModeratorRepository.load(id);

        const passwordIsCorrect = await this.hashComparer.compare(
            currentPassword,
            moderator.password,
        );

        if (!passwordIsCorrect) {
            throw new Error('Current password wrong');
        }

        if (newPassword !== newPasswordConfirmation) {
            throw new Error(
                'New password and new password confirmation no matching',
            );
        }

        if (currentPassword === newPassword) {
            throw new Error('The new password is equal current password');
        }

        const moderatorUpdated = await this.changePasswordModeratorRepository.changePassword(
            {
                id,
                password: await this.hashGenerater.generate(newPassword),
            },
        );

        return moderatorUpdated;
    }
}

export default ChangePasswordModeratorService;
