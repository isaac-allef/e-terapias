import CreateModeratorService from '../../core/services/CreateModeratorService';
import CreateModeratorFakeRepository from '../../infra/db/typeorm/repositories/fakes/CreateModeratorFakeRepository';

const makeCreateModeratorService = (): CreateModeratorService => {
    const createModeratorRepository = new CreateModeratorFakeRepository();

    const createModerator = new CreateModeratorService(
        createModeratorRepository,
    );

    return createModerator;
};

export default makeCreateModeratorService;
