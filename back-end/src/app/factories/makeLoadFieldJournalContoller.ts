import LoadFieldJournalByIdService from '../../core/services/LoadFieldJournalByIdService';
import FieldJournalTypeormRepository from '../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import { LoadFieldJournalController } from '../../presentation/controllers/LoadFieldJournalController';
import { Controller } from '../../presentation/protocols/controller';

const makeLoadFieldJournalContoller = (): Controller => {
    const loadFieldJournalRepository = new FieldJournalTypeormRepository();
    const loadFieldJournalByIdService = new LoadFieldJournalByIdService(
        loadFieldJournalRepository,
    );
    return new LoadFieldJournalController(loadFieldJournalByIdService);
};

export default makeLoadFieldJournalContoller;
