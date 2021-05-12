import ChangePasswordModeratorService from '../../../../core/services/ChangePasswordModeratorService';
import BcryptAdapter from '../../../../infra/cryptography/bcryptAdapter';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { ChangePasswordModeratorController } from '../../../../presentation/controllers/ChangePasswordModeratorController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeChangePasswordModeratorContoller = (): Controller => {
    const hashGenerater = new BcryptAdapter(12);
    const hashComparer = hashGenerater;
    const loadModeratorByIdRepository = new ModeratorTypeormRepository();
    const changePasswordModeratorRepository = new ModeratorTypeormRepository();
    const changePasswordModeratorService = new ChangePasswordModeratorService(
        hashGenerater,
        hashComparer,
        loadModeratorByIdRepository,
        changePasswordModeratorRepository,
    );
    return new ChangePasswordModeratorController(
        changePasswordModeratorService,
    );
};

export default makeChangePasswordModeratorContoller;
