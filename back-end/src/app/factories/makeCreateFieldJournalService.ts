import CreateFieldJournalService from '../../core/services/CreateFieldJournalService';
import CreateFieldJournalFakeRepository from '../../infra/db/typeorm/repositories/fakes/CreateFieldJournalFakeRepository';
import LoadEtherapyByIdFakeRepository from '../../infra/db/typeorm/repositories/fakes/LoadEtherapyByIdFakeRepository';
import LoadModeratorByIdFakeRepository from '../../infra/db/typeorm/repositories/fakes/LoadModeratorByIdFakeRepository';

const makeCreateFieldJournalService = (): CreateFieldJournalService => {
    const createFieldJournalRepository = new CreateFieldJournalFakeRepository();
    const loadModeratorByIdRepository = new LoadModeratorByIdFakeRepository();
    const loadEtherapyByIdRepository = new LoadEtherapyByIdFakeRepository();

    const createFieldJournal = new CreateFieldJournalService(
        createFieldJournalRepository,
        loadModeratorByIdRepository,
        loadEtherapyByIdRepository,
    );

    return createFieldJournal;
};

export default makeCreateFieldJournalService;
