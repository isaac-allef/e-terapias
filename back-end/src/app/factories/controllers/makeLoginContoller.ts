import AuthenticationService from '../../../core/services/AuthenticationService';
import BcryptAdapter from '../../../infra/cryptography/bcryptAdapter';
import ModeratorTypeormRepository from '../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import JwtAdapter from '../../../infra/token/jwtAdapter';
import { LoginController } from '../../../presentation/controllers/LoginController';
import { Controller } from '../../../presentation/protocols/controller';
import env from '../../config/env';

const makeLoginContoller = (): Controller => {
    const salt = 12;
    const hashComparer = new BcryptAdapter(salt);
    const tokenGenerater = new JwtAdapter(env.jwtSecret);
    const moderatorTypeormRepository = new ModeratorTypeormRepository();
    const authenticationService = new AuthenticationService(
        moderatorTypeormRepository,
        hashComparer,
        tokenGenerater,
        moderatorTypeormRepository,
    );
    return new LoginController(authenticationService);
};

export default makeLoginContoller;
