import AuthenticationService from '../../core/services/AuthenticationService';
import LoadModeratorByEmailFakeRepository from '../../infra/db/typeorm/repositories/fakes/LoadModeratorByEmailFakeRepository';
import UpdateAccessTokenFakeRepository from '../../infra/db/typeorm/repositories/fakes/UpdateAccessTokenFakeRepository';

const makeAuthenticationService = (): AuthenticationService => {
    const loadModeratorByEmailRepository = new LoadModeratorByEmailFakeRepository();
    const updateAccessTokenRepository = new UpdateAccessTokenFakeRepository();

    const authentication = new AuthenticationService(
        loadModeratorByEmailRepository,
        updateAccessTokenRepository,
    );

    return authentication;
};

export default makeAuthenticationService;
