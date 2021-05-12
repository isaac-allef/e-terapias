import LoadAllFieldJournalsService from '../../../../core/services/LoadAllFieldJournalsService';
import FieldJournalTypeormRepository from '../../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import { LoadAllFieldJournalsController } from '../../../../presentation/controllers/LoadAllFieldJournalsController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadAllFieldJournalsContoller = (): Controller => {
    const loadAllFieldJournalsRepository = new FieldJournalTypeormRepository();
    const loadAllFieldJournalsService = new LoadAllFieldJournalsService(
        loadAllFieldJournalsRepository,
    );
    return new LoadAllFieldJournalsController(loadAllFieldJournalsService);
};

export default makeLoadAllFieldJournalsContoller;
