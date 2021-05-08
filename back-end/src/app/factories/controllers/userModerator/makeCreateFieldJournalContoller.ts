import CreateFieldJournalService from '../../../../core/services/CreateFieldJournalService';
import EtherapyTypeormRepository from '../../../../infra/db/typeorm/repositories/EtherapyTypeormRepository';
import FieldJournalTypeormRepository from '../../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { CreateFieldJournalController } from '../../../../presentation/controllers/CreateFieldJournalController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeCreateFieldJournalContoller = (): Controller => {
    const createFieldJournalRepository = new FieldJournalTypeormRepository();
    const loadModeratorRepository = new ModeratorTypeormRepository();
    const loadEtherapyRepository = new EtherapyTypeormRepository();
    const createFieldJournalService = new CreateFieldJournalService(
        createFieldJournalRepository,
        loadModeratorRepository,
        loadEtherapyRepository,
    );
    return new CreateFieldJournalController(createFieldJournalService);
};

export default makeCreateFieldJournalContoller;
