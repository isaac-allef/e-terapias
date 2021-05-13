import UploadManagersListService from '../../../../core/services/UploadManagersListService';
import BcryptAdapter from '../../../../infra/cryptography/bcryptAdapter';
import ManagerTypeormRepository from '../../../../infra/db/typeorm/repositories/ManagerTypeormRepository';
import { UploadManagersListController } from '../../../../presentation/controllers/UploadManagersListController';
import { Controller } from '../../../../presentation/protocols/controller';
import makeSecretControllerDecorator from '../../decorators/makeSecretControllerDecorator';

const makeUploadManagersListContoller = (): Controller => {
    const hashGenerater = new BcryptAdapter(12);
    const uploadManagersListRepository = new ManagerTypeormRepository();
    const uploadManagersListService = new UploadManagersListService(
        hashGenerater,
        uploadManagersListRepository,
    );
    const uploadManagersListController = new UploadManagersListController(
        uploadManagersListService,
    );

    return makeSecretControllerDecorator(uploadManagersListController);
};

export default makeUploadManagersListContoller;
