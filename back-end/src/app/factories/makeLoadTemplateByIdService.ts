import LoadTemplateByIdService from '../../core/services/LoadTemplateByIdService';
import LoadTemplateByIdFakeRepository from '../../infra/db/typeorm/repositories/fakes/LoadTemplateByIdFakeRepository';

const makeLoadTemplateByIdService = (): LoadTemplateByIdService => {
    const LoadTemplateByIdRepository = new LoadTemplateByIdFakeRepository();

    const LoadTemplateById = new LoadTemplateByIdService(
        LoadTemplateByIdRepository,
    );

    return LoadTemplateById;
};

export default makeLoadTemplateByIdService;
