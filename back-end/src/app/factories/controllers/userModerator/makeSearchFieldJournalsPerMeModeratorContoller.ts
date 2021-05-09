import SearchFieldJournalsPerModeratorService from '../../../../core/services/SearchFieldJournalsPerModeratorService';
import FieldJournalTypeormRepository from '../../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import { SearchFieldJournalsPerMeModeratorController } from '../../../../presentation/controllers/SearchFieldJournalsPerMeModeratorController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeSearchFieldJournalsPerMeModeratorContoller = (): Controller => {
    const searchFieldJournalsPerModeratorRepository = new FieldJournalTypeormRepository();
    const searchFieldJournalsPerModeratorService = new SearchFieldJournalsPerModeratorService(
        searchFieldJournalsPerModeratorRepository,
    );
    return new SearchFieldJournalsPerMeModeratorController(
        searchFieldJournalsPerModeratorService,
    );
};

export default makeSearchFieldJournalsPerMeModeratorContoller;
