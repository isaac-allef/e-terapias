import { LoginController } from '../../../../presentation/controllers/LoginController';
import { Controller } from '../../../../presentation/protocols/controller';
import makeAuthenticationManagerService from '../../services/makeAuthenticationManagerService';

const makeLoginManagerContoller = (): Controller => {
    const authenticationService = makeAuthenticationManagerService();

    return new LoginController(authenticationService);
};

export default makeLoginManagerContoller;
