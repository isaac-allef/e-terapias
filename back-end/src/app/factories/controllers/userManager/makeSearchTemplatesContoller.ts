import SearchTemplatesService from '../../../../core/services/SearchTemplatesService';
import TemplateTypeormRepository from '../../../../infra/db/typeorm/repositories/TemplateTypeormRepository';
import { SearchTemplatesController } from '../../../../presentation/controllers/SearchTemplatesController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeSearchTemplatesContoller = (): Controller => {
    const searchTemplatesRepository = new TemplateTypeormRepository();
    const searchTemplatesService = new SearchTemplatesService(
        searchTemplatesRepository,
    );
    return new SearchTemplatesController(searchTemplatesService);
};

export default makeSearchTemplatesContoller;
