import LoadAllFieldJournalsPerModeratorService from '../../../../core/services/LoadAllFieldJournalsPerModeratorService';
import FieldJournalTypeormRepository from '../../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import { LoadAllFieldJournalsPerModeratorController } from '../../../../presentation/controllers/LoadAllFieldJournalsPerModeratorController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadAllFieldJournalsPerModeratorContoller = (): Controller => {
    const loadAllFieldJournalsPerModeratorRepository = new FieldJournalTypeormRepository();
    const loadAllFieldJournalsPerModeratorService = new LoadAllFieldJournalsPerModeratorService(
        loadAllFieldJournalsPerModeratorRepository,
    );
    return new LoadAllFieldJournalsPerModeratorController(
        loadAllFieldJournalsPerModeratorService,
    );
};

export default makeLoadAllFieldJournalsPerModeratorContoller;
