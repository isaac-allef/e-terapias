import LoadFieldJournalByIdService from '../../../../core/services/LoadFieldJournalByIdService';
import FieldJournalTypeormRepository from '../../../../infra/db/typeorm/repositories/FieldJournalTypeormRepository';
import { LoadFieldJournalPerMeModeratorController } from '../../../../presentation/controllers/LoadFieldJournalPerMeModeratorController';
import { Controller } from '../../../../presentation/protocols/controller';

const makeLoadFieldJournalPerMeModeratorContoller = (): Controller => {
    const loadFieldJournalRepository = new FieldJournalTypeormRepository();
    const loadFieldJournalByIdService = new LoadFieldJournalByIdService(
        loadFieldJournalRepository,
    );
    return new LoadFieldJournalPerMeModeratorController(
        loadFieldJournalByIdService,
    );
};

export default makeLoadFieldJournalPerMeModeratorContoller;
