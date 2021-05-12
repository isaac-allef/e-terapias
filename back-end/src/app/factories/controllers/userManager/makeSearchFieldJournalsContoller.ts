import SearchFieldJournalsService from '../../../../core/services/SearchFieldJournalsService';
import FieldJournalTypeormRepository from '../../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import { SearchFieldJournalsController } from '../../../../presentation/controllers/SearchFieldJournalsController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeSearchFieldJournalsContoller = (): Controller => {
    const searchFieldJournalsRepository = new FieldJournalTypeormRepository();
    const searchFieldJournalsService = new SearchFieldJournalsService(
        searchFieldJournalsRepository,
    );
    return new SearchFieldJournalsController(searchFieldJournalsService);
};

export default makeSearchFieldJournalsContoller;
