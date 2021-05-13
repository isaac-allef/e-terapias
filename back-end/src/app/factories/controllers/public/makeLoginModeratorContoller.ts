import { LoginController } from '../../../../presentation/controllers/LoginController';
import { Controller } from '../../../../presentation/protocols/controller';
import makeAuthenticationModeratorService from '../../services/makeAuthenticationModeratorService';

const makeLoginModeratorContoller = (): Controller => {
    const authenticationService = makeAuthenticationModeratorService();

    return new LoginController(authenticationService);
};

export default makeLoginModeratorContoller;
