import AuthenticationService from '../../../core/services/AuthenticationService';
import BcryptAdapter from '../../../infra/cryptography/bcryptAdapter';
import ModeratorTypeormRepository from '../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import JwtAdapter from '../../../infra/token/jwtAdapter';
import env from '../../config/env';

const makeAuthenticationModeratorService = (): AuthenticationService => {
    const salt = 12;
    const hashComparer = new BcryptAdapter(salt);
    const tokenGenerater = new JwtAdapter(env.jwtSecret);

    const moderatorTypeormRepository = new ModeratorTypeormRepository();
    const loadUserByEmailRepository = moderatorTypeormRepository;
    const updateAccessTokenRepository = moderatorTypeormRepository;

    return new AuthenticationService(
        loadUserByEmailRepository,
        hashComparer,
        tokenGenerater,
        updateAccessTokenRepository,
    );
};

export default makeAuthenticationModeratorService;
