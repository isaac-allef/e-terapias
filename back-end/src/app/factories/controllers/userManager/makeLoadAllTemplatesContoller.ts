import LoadAllTemplatesService from '../../../../core/services/LoadAllTemplatesService';
import TemplateTypeormRepository from '../../../../infra/db/typeorm/repositories/TemplateTypeormRepository';
import { LoadAllTemplatesController } from '../../../../presentation/controllers/LoadAllTemplatesController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadAllTemplatesContoller = (): Controller => {
    const loadAllTemplatesRepository = new TemplateTypeormRepository();
    const loadAllTemplatesService = new LoadAllTemplatesService(
        loadAllTemplatesRepository,
    );
    return new LoadAllTemplatesController(loadAllTemplatesService);
};

export default makeLoadAllTemplatesContoller;
