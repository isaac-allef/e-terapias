import LoadAllFieldJournalsPerEtherapyService from '../../../../core/services/LoadAllFieldJournalsPerEtherapyService';
import FieldJournalTypeormRepository from '../../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import { LoadAllFieldJournalsPerEtherapyController } from '../../../../presentation/controllers/LoadAllFieldJournalsPerEtherapyController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadAllFieldJournalsPerEtherapyContoller = (): Controller => {
    const loadAllFieldJournalsPerEtherapyRepository = new FieldJournalTypeormRepository();
    const loadAllFieldJournalsPerEtherapyService = new LoadAllFieldJournalsPerEtherapyService(
        loadAllFieldJournalsPerEtherapyRepository,
    );
    return new LoadAllFieldJournalsPerEtherapyController(
        loadAllFieldJournalsPerEtherapyService,
    );
};

export default makeLoadAllFieldJournalsPerEtherapyContoller;
