import CreateFieldJournalService from '../../core/services/CreateFieldJournalService';
import CreateFieldJournalFakeRepository from '../../infra/db/typeorm/repositories/fakes/CreateFieldJournalFakeRepository';

const makeCreateFieldJournalService = (): CreateFieldJournalService => {
    const createFieldJournalRepository = new CreateFieldJournalFakeRepository();

    const createFieldJournal = new CreateFieldJournalService(
        createFieldJournalRepository,
    );

    return createFieldJournal;
};

export default makeCreateFieldJournalService;
