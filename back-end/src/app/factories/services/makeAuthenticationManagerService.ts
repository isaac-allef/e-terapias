import AuthenticationService from '../../../core/services/AuthenticationService';
import BcryptAdapter from '../../../infra/cryptography/bcryptAdapter';
import ManagerTypeormRepository from '../../../infra/db/typeorm/repositories/ManagerTypeormRepository';
import JwtAdapter from '../../../infra/token/jwtAdapter';
import env from '../../config/env';

const makeAuthenticationManagerService = (): AuthenticationService => {
    const salt = 12;
    const hashComparer = new BcryptAdapter(salt);
    const tokenGenerater = new JwtAdapter(env.jwtSecret);

    const managerTypeormRepository = new ManagerTypeormRepository();
    const loadUserByEmailRepository = managerTypeormRepository;
    const updateAccessTokenRepository = managerTypeormRepository;

    return new AuthenticationService(
        loadUserByEmailRepository,
        hashComparer,
        tokenGenerater,
        updateAccessTokenRepository,
    );
};

export default makeAuthenticationManagerService;
