import LoadModeratorByIdService from '../../core/services/LoadModeratorByIdService';
import LoadModeratorByIdFakeRepository from '../../infra/db/typeorm/repositories/fakes/LoadModeratorByIdFakeRepository';

const makeLoadModeratorByIdService = (): LoadModeratorByIdService => {
    const LoadModeratorByIdRepository = new LoadModeratorByIdFakeRepository();

    const LoadModeratorById = new LoadModeratorByIdService(
        LoadModeratorByIdRepository,
    );

    return LoadModeratorById;
};

export default makeLoadModeratorByIdService;
