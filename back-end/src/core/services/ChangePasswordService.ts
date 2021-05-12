import HashComparer from '../protocols/cryptography/HashComparer';
import HashGenerater from '../protocols/cryptography/HashGenerater';
import ChangePasswordRepository from '../protocols/db/repositories/ChangePasswordRepository';
import LoadUserByTokenRepository from '../protocols/db/repositories/LoadUserByTokenRepository';

export type params = {
    token: string;
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
};

class ChangePasswordService {
    constructor(
        private hashGenerater: HashGenerater,
        private hashComparer: HashComparer,
        private loadUserByTokenRepository: LoadUserByTokenRepository,
        private changePasswordRepository: ChangePasswordRepository,
    ) {}

    public async execute({
        token,
        currentPassword,
        newPassword,
        newPasswordConfirmation,
    }: params): Promise<boolean> {
        const user = await this.loadUserByTokenRepository.loadByToken(token);

        const passwordIsCorrect = await this.hashComparer.compare(
            currentPassword,
            user.password,
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

        const isChange = await this.changePasswordRepository.changePassword({
            token,
            password: await this.hashGenerater.generate(newPassword),
        });

        return isChange;
    }
}

export default ChangePasswordService;
