import LoadUserByTokenRepository from '../../../core/protocols/db/repositories/LoadUserByTokenRepository';
import LoadUserByTokenService from '../../../core/services/LoadUserByTokenService';
import JwtAdapter from '../../../infra/token/jwtAdapter';
import env from '../../config/env';

const makeLoadUserByTokenService = (
    loadUserByTokenRepository: LoadUserByTokenRepository,
): LoadUserByTokenService => {
    const tokenDecodeder = new JwtAdapter(env.jwtSecret);
    return new LoadUserByTokenService(
        tokenDecodeder,
        loadUserByTokenRepository,
    );
};

export default makeLoadUserByTokenService;
