import ChangePasswordService from '../../../../core/services/ChangePasswordService';
import BcryptAdapter from '../../../../infra/cryptography/bcryptAdapter';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { ChangePasswordController } from '../../../../presentation/controllers/ChangePasswordController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeChangePasswordModeratorContoller = (): Controller => {
    const hashGenerater = new BcryptAdapter(12);
    const hashComparer = hashGenerater;
    const loadUserByTokenRepository = new ModeratorTypeormRepository();
    const changePasswordRepository = new ModeratorTypeormRepository();
    const changePasswordService = new ChangePasswordService(
        hashGenerater,
        hashComparer,
        loadUserByTokenRepository,
        changePasswordRepository,
    );
    return new ChangePasswordController(changePasswordService);
};

export default makeChangePasswordModeratorContoller;
