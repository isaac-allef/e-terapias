import UpdateFieldJournalService from '../../../../core/services/UpdateFieldJournalService';
import FieldJournalTypeormRepository from '../../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import ModeratorTypeormRepository from '../../../../infra/db/typeorm/repositories/ModeratorTypeormRepository';
import { UpdateFieldJournalController } from '../../../../presentation/controllers/UpdateFieldJournalController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeUpdateFieldJournalContoller = (): Controller => {
    const updateFieldJournalRepository = new FieldJournalTypeormRepository();
    const loadModeratorRepository = new ModeratorTypeormRepository();
    const loadFieldJournalRepository = new FieldJournalTypeormRepository();
    const updateFieldJournalService = new UpdateFieldJournalService(
        updateFieldJournalRepository,
        loadModeratorRepository,
        loadFieldJournalRepository,
    );
    return new UpdateFieldJournalController(updateFieldJournalService);
};

export default makeUpdateFieldJournalContoller;
