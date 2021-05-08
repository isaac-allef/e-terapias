import LoadAllFieldJournalsPerModeratorService from '../../../../core/services/LoadAllFieldJournalsPerModeratorService';
import FieldJournalTypeormRepository from '../../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import { LoadAllFieldJournalsPerMeModeratorController } from '../../../../presentation/controllers/LoadAllFieldJournalsPerMeModeratorController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadAllFieldJournalsPerMeModeratorContoller = (): Controller => {
    const loadAllFieldJournalsPerModeratorRepository = new FieldJournalTypeormRepository();
    const loadAllFieldJournalsPerModeratorService = new LoadAllFieldJournalsPerModeratorService(
        loadAllFieldJournalsPerModeratorRepository,
    );
    return new LoadAllFieldJournalsPerMeModeratorController(
        loadAllFieldJournalsPerModeratorService,
    );
};

export default makeLoadAllFieldJournalsPerMeModeratorContoller;
