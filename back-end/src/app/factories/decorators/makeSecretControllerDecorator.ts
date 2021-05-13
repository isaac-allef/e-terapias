import { Controller } from '../../../presentation/protocols/controller';
import { SecretControllerDecorator } from '../../decorators/SecretControllerDecorator';

const makeSecretControllerDecorator = (controller: Controller): Controller => {
    return new SecretControllerDecorator(controller);
};

export default makeSecretControllerDecorator;
